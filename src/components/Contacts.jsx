import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.jpeg";
import { avatars } from "../utils/generalConsts";
import Logout from "./Logout";

const StyledContactContainerDiv = styled.div`
  display: grid;
  grid-template-rows: 15% 70% 15%;
  overflow: hidden;

  width: 100%;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    cursor: pointer;
    img {
      height: 1.5rem;
      border-radius: 0.5rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
      font-family: "Bungee Outline", cursive;
      font-size: 1rem;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    width: 100%;
    &::-webkit-scrollbar {
      width: 0.2rem;
      color: greenyellow;
      &-thumb {
        background-color: #4402e8;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      display: flex;
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      overflow: hidden;
      .avatar {
        svg {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          @media screen and (max-width: 720px) and (min-width: 425px) {
            font-size: 0.8rem;
          }
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .avatar {
      svg {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 768px) and (max-width: 425px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 0.8rem;
        }
      }
    }
  }
`;

function Contacts(props) {
  const [username, setUsername] = useState();
  const [UserImage, setUserImage] = useState();
  const [selected, setSelected] = useState();

  useEffect(() => {
    try {
      const matchingAvatar = avatars.find(
        (avatar) => avatar.name === props.user.avatarImage
      );

      if (matchingAvatar) {
        setUserImage(matchingAvatar.Display);
      } else {
      }

      setUsername(props.user.username);
    } catch (error) {}
  }, [props]);

  const changeCurrentChat = (index, contact) => {
    setSelected(index);

    props.chatChange(contact);
  };

  const userAvatarComponent = avatars.find(
    (avatar) => avatar.name === props.user.avatarImage
  )?.Display;

  return (
    <>
      {UserImage && username && (
        <StyledContactContainerDiv>
          <div className={`brand `}>
            <img
              src={logo}
              alt="logo"
              onClick={() => changeCurrentChat("", "")}
            />
            <h3 onClick={() => changeCurrentChat("", "")}>GROOVECHAT</h3>
            {window.innerWidth > 515 && window.innerWidth < 650 ? (
              <></>
            ) : (
              <Logout />
            )}
          </div>
          <div className="contacts">
            {props.contacts.map((contact, index) => {
              const AvatarComponent = avatars.find(
                (avatar) => avatar.name === contact.avatarImage
              )?.Display;

              return (
                <div
                  className={`contact ${index === selected ? "selected" : ""}`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    {AvatarComponent && React.createElement(AvatarComponent)}
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            {window.innerWidth > 515 && window.innerWidth < 650 ? (
              <Logout />
            ) : (
              <div className="avatar">
                {userAvatarComponent &&
                  React.createElement(userAvatarComponent)}
              </div>
            )}

            <div className="username">
              <h2>{username}</h2>
            </div>
          </div>
        </StyledContactContainerDiv>
      )}
    </>
  );
}

export default Contacts;
