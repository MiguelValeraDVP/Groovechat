import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { contactsRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import { io } from "socket.io-client";
import Welcome from "../components/Welcome";
import DynamicBackground from "../components/DynamicBackground";

const StyledChatContainerDiv = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    z-index: 100;
    background-color: rgb(8 4 32 / 79%);
    display: grid;
    grid-template-columns: ${({ isSmallScreen }) =>
      isSmallScreen ? "100%" : "35% 65%"};

    @media screen and (max-width: 425px) {
      display: flex;
    }
  }
`;

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [user, setUser] = useState("");
  const [currentChat, setCurrentChat] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem("user")) {
        navigate("/login");
      } else {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
        if (user.avatarImage !== "") {
          const response = await axios.get(`${contactsRoute}/${user._id}`);
          const data = response.data;
          setContacts(data);
        } else {
          navigate("/set-avatar");
        }
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      socket.current = io(host);
      socket.current.emit("add-user", user._id);
    }
  }, [user]);

  useEffect(() => {}, [contacts]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    setIsLoaded(!isLoaded);
    setShowChat(!showChat);
  };

  return (
    <>
      <StyledChatContainerDiv>
        <DynamicBackground />
        <div className="container">
          {window.innerWidth > 425 ? (
            <>
              <Contacts
                contacts={contacts}
                user={user}
                chatChange={handleChatChange}
              />
              {!isLoaded && currentChat === "" ? (
                <Welcome user={user} />
              ) : (
                <ChatContainer
                  currentChat={currentChat}
                  setIsLoaded={setIsLoaded}
                  user={user}
                  socket={socket}
                  chatChange={handleChatChange}
                />
              )}
            </>
          ) : showChat ? (
            <ChatContainer
              currentChat={currentChat}
              setIsLoaded={setIsLoaded}
              user={user}
              setShowChat={setShowChat}
              chatChange={handleChatChange}
              socket={socket}
            />
          ) : (
            <Contacts
              contacts={contacts}
              user={user}
              chatChange={handleChatChange}
            />
          )}
        </div>
      </StyledChatContainerDiv>
    </>
  );
}

export default Chat;
