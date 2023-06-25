import { BigHead } from "@bigheads/core";
import styled from "styled-components";

const StyledAvatarDiv = styled.div`
  border: 0.4rem solid transparent;
  padding: 0.4rem;
  border-radius: 5rem;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  transition: 0.5s ease-in-out;
  svg {
    height: 6rem;
  }
`;

export const toastSetup = {
  position: "bottom-right",
  autoClose: 5000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export const validatePassword = (password) => {
  var regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  return regex.test(password);
};

const pepe = () => (
  <StyledAvatarDiv>
    <BigHead
      accessory="shades"
      body="breasts"
      circleColor="blue"
      clothing="vneck"
      clothingColor="green"
      eyebrows="leftLowered"
      eyes="dizzy"
      faceMask={false}
      faceMaskColor="green"
      facialHair="stubble"
      graphic="graphQL"
      hair="balding"
      hairColor="white"
      hat="none"
      hatColor="blue"
      lashes
      lipColor="red"
      mask
      mouth="tongue"
      skinTone="yellow"
    />
  </StyledAvatarDiv>
);

const romaria = () => (
  <StyledAvatarDiv>
    <BigHead
      accessory="tinyGlasses"
      body="breasts"
      circleColor="blue"
      clothing="dress"
      clothingColor="green"
      eyebrows="leftLowered"
      eyes="wink"
      faceMask={false}
      faceMaskColor="black"
      facialHair="none3"
      graphic="none"
      hair="balding"
      hairColor="black"
      hat="none"
      hatColor="red"
      lashes={false}
      lipColor="green"
      mask
      mouth="open"
      skinTone="red"
    />
  </StyledAvatarDiv>
);

const federica = () => (
  <StyledAvatarDiv>
    <BigHead
      accessory="none"
      body="breasts"
      circleColor="blue"
      clothing="tankTop"
      clothingColor="white"
      eyebrows="raised"
      eyes="wink"
      faceMask={false}
      faceMaskColor="blue"
      facialHair="stubble"
      graphic="graphQL"
      hair="balding"
      hairColor="black"
      hat="none3"
      hatColor="white"
      lashes
      lipColor="purple"
      mask
      mouth="lips"
      skinTone="light"
    />
  </StyledAvatarDiv>
);

const papichulo = () => (
  <StyledAvatarDiv>
    <BigHead
      accessory="tinyGlasses"
      body="chest"
      circleColor="blue"
      clothing="naked"
      clothingColor="blue"
      eyebrows="angry"
      eyes="dizzy"
      faceMask={false}
      faceMaskColor="blue"
      facialHair="none2"
      graphic="gatsby"
      hair="balding"
      hairColor="blonde"
      hat="none"
      hatColor="red"
      lashes
      lipColor="red"
      mask
      mouth="tongue"
      skinTone="light"
    />
  </StyledAvatarDiv>
);

const draLouis = () => (
  <StyledAvatarDiv>
    <BigHead
      accessory="roundGlasses"
      body="chest"
      circleColor="blue"
      clothing="dressShirt"
      clothingColor="blue"
      eyebrows="leftLowered"
      eyes="normal"
      faceMask={false}
      faceMaskColor="blue"
      facialHair="none"
      graphic="gatsby"
      hair="bob"
      hairColor="white"
      hat="none3"
      hatColor="white"
      lashes={false}
      lipColor="turqoise"
      mask
      mouth="lips"
      skinTone="red"
    />
  </StyledAvatarDiv>
);

const humberto = () => (
  <StyledAvatarDiv>
    <BigHead
      accessory="roundGlasses"
      body="chest"
      circleColor="blue"
      clothing="shirt"
      clothingColor="green"
      eyebrows="concerned"
      eyes="normal"
      faceMask={false}
      faceMaskColor="red"
      facialHair="mediumBeard"
      graphic="vue"
      hair="afro"
      hairColor="blue"
      hat="none"
      hatColor="blue"
      lashes={false}
      lipColor="purple"
      mask
      mouth="sad"
      skinTone="black"
    />
  </StyledAvatarDiv>
);
export const avatars = [
  { name: "pepe", Display: pepe },
  { name: "romaria", Display: romaria },
  { name: "federica", Display: federica },
  { name: "papichulo", Display: papichulo },
  { name: "draLouis", Display: draLouis },
  { name: "humberto", Display: humberto },
];
