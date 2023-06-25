import React, { useEffect, useState } from "react";
import welcome from "../assets/welcome.json";
import Lottie from "lottie-react";
import dashboartChatLottie from "../assets/dashboard-chat.json";
import styled from "styled-components";
import mobileChat from "../assets/chat-2.json";

const StyledWelcomeContainerDiv = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2,
  h3 {
    color: white;
    text-transform: capitalize;
  }
`;

function Welcome({ user }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <StyledWelcomeContainerDiv>
      <Lottie
        animationData={welcome}
        style={{ height: "100px", width: "300px" }}
        loop={false}
      />
      <h2>{user.username}</h2>

      {isMobile ? (
        <Lottie 
          animationData={mobileChat}
          style={{ height: "300px", width: "300px" }}
        />
      ) : (
        <Lottie
          animationData={dashboartChatLottie}
          style={{ height: "300px", width: "300px" }}
        />
      )}

      <h3>Please select a chat to start messaging!</h3>
    </StyledWelcomeContainerDiv>
  );
}

export default Welcome;
