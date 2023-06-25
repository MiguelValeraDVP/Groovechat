import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import { avatars, toastSetup } from "../utils/generalConsts";
import axios from "axios";
import { SetAvatarRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import DynamicBackground from "../components/DynamicBackground";

const StyledContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  width: 100vw;
  z-index: 1;
  position: absolute;
`;

const StyledBackgroundContainerDiv = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
`;

const StyledButton = styled.button`
  background-color: #997ef0;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  transition: 0.5s ease-in-out;
  margin-top: 2rem;
  &:hover {
    background-color: #4e0eff;
  }
`;

const StyledTitleContainerDiv = styled.div``;

const StyledTextH1 = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 1rem;
`;

const StyledAvatarDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  background-color: #131324a8;

  > div.selected-avatar-yeah {
    border: 4px solid gold;
    background-color: #5324aa;
  }
`;

function SetAvatar() {
  const [selectedAvatarName, setSelectedAvatarName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, []);

  const updateProfileAvatar = async () => {
    if (selectedAvatarName === "") {
      toast.error("Please select an avatar to continue", toastSetup);
    }
    try {
      const user = await JSON.parse(localStorage.getItem("user"));

      const { data } = await axios.post(`${SetAvatarRoute}/${user._id}`, {
        image: selectedAvatarName,
      });

      const updatedUserData = data.userData;

      localStorage.setItem("user", JSON.stringify(updatedUserData));

      toast.success("Avatar saved", toastSetup);

      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Please try again", toastSetup);
    }
  };

  return (
    <>
      <DynamicBackground />
      <StyledContainerDiv>
        <StyledBackgroundContainerDiv>
          <StyledTitleContainerDiv>
            <StyledTextH1>Pick an avatar as your profile picture!</StyledTextH1>
          </StyledTitleContainerDiv>
          <StyledAvatarDiv>
            {avatars.map((AvatarComponent) => (
              <div
                key={AvatarComponent.name}
                onClick={() => setSelectedAvatarName(AvatarComponent.name)}
                className={
                  selectedAvatarName === AvatarComponent.name
                    ? "selected-avatar-yeah"
                    : ""
                }
              >
                <AvatarComponent.Display />
              </div>
            ))}
          </StyledAvatarDiv>
          <StyledButton onClick={() => updateProfileAvatar()}>
            Set as profile picture
          </StyledButton>
        </StyledBackgroundContainerDiv>
      </StyledContainerDiv>
      <ToastContainer />
    </>
  );
}

export default SetAvatar;
