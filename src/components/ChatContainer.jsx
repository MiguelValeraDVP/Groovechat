import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { avatars } from "../utils/generalConsts.js";
import ChatInput from "./ChatInput.jsx";
import axios from "axios";
import { addMessageRoute, getMessageRoute } from "../utils/APIRoutes.js";
import { TbArrowBackUp } from "react-icons/tb";

const StyledChatContainerDiv = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;

  &.full-width {
    width: 100%;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
    .avatar {
      svg {
        height: 3rem;
      }
    }
    .username {
      h3 {
        color: white;
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: auto;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      color: greenyellow;
      &-thumb {
        background-color: #4402e8;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
    .sent {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

function ChatContainer({ currentChat, user, socket, chatChange }) {
  const scrollRef = useRef();

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [fullWidth, setFullWidth] = useState();

  useEffect(() => {}, [currentChat, user]);

  useEffect(() => {
    const asyncCall = async () => {
      if (currentChat) {
        const response = await axios.post(getMessageRoute, {
          from: user._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    };
    asyncCall();
  }, [currentChat, user]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (message) => {
        setArrivalMessage({ fromSelf: false, message });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages]);

  useEffect(() => {
    if (window.innerWidth < 425) {
      setFullWidth(true);
    }
  }, []);

  const userAvatarComponent = () => {
    const AvatarComponent = avatars.find(
      (avatar) => avatar.name === currentChat.avatarImage
    )?.Display;

    if (AvatarComponent) {
      return <AvatarComponent />;
    } else {
      return null; // or any fallback content you want to display
    }
  };

  const handleSendMessage = async (message) => {
    await axios.post(addMessageRoute, {
      from: user._id,
      to: currentChat._id,
      message,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: user._id,
      message,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message });
    setMessages(msgs);
  };

  const goBack = (empty) => {
    chatChange(empty);
  };

  return (
    <StyledChatContainerDiv className={`${fullWidth ? "full-width" : ""}`}>
      <div className="chat-header">
        <div className="user-details">
          <TbArrowBackUp
            color="#4402e8"
            fontSize="30px"
            onClick={() => goBack("")}
          />

          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
          <div className="avatar">
            {userAvatarComponent && React.createElement(userAvatarComponent)}
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => {
          return (
            <div ref={scrollRef} key={index}>
              <div
                className={`message ${message.fromSelf ? "sent" : "recieved"}`}
              >
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMessage={handleSendMessage} />
    </StyledChatContainerDiv>
  );
}

export default ChatContainer;
