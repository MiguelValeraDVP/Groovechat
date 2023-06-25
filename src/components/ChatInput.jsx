import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import styled from "styled-components";

const StyledChatInpudDiv = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }

      .EmojiPickerReact {
        position: absolute;
        top: -400px;
        max-height: 25rem;
        .--epr-bg-color {
          background-color: #9886f3;
        }
        .--epr-category-label-bg-color {
          background-color: #9886f3;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-content: center;
    gap: 2rem;
    background-color: #ffffff34;
    margin-left: 1rem;
    input {
      width: 90%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9886f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9886f3;
      border: none;
      svg {
        color: white;
        font-size: 2rem;
      }
    }
  }
`;

function ChatInput({ handleSendMessage }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setMsg(msg + emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0 && msg !== "" && msg !== " ") {
      handleSendMessage(msg);
      setMsg("");
    }
  };
  return (
    <StyledChatInpudDiv>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPicker} />
          {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form
        className="input-container"
        onClick={() => setShowEmojiPicker(false)}
        onSubmit={(event) => sendChat(event)}
      >
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </StyledChatInpudDiv>
  );
}

export default ChatInput;
