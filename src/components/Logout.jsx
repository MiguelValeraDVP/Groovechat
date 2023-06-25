import React from "react";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #d74c4c;
    svg {
      color: #080808;
    }
  }
  svg {
    color: #fffefe;
  }
`;
function Logout() {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <StyledButton>
      <BiPowerOff onClick={handleClick} />
    </StyledButton>
  );
}

export default Logout;
