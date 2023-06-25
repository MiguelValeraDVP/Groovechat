import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo.svg";
import { toastSetup, validatePassword } from "../../utils/generalConsts";
import axios from "axios";
import { registerRoute } from "../../utils/APIRoutes";

const FormContainerDiv = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: #00000076;
  border-radius: 2rem;
  padding: 3rem 5rem;
  margin: 1rem;
  @media screen and (max-width: 550px) {
    border-radius: 1rem;
    padding: 2rem;
  }
  @media screen and (max-width: 376px) {
    padding: 3rem;
    border-radius: 0;
    width: 100%;
    margin: 2rem 0;
  }
`;

const BrandDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const StyledImg = styled.img`
  height: 5rem;
`;

const StyledTitleH1 = styled.h1`
  color: white;
  text-transform: uppercase;
`;

const StyledInput = styled.input`
  background-color: transparent;
  padding: 1rem;
  border: 0.1rem solid #4e0eff;
  border-radius: 0.4rem;
  color: white;
  width: 100%;
  font-size: 1rem;
  &:focus {
    border: 0.1rem solid #997ef0;
    outline: none;
  }
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
  &:hover {
    background-color: #4e0eff;
  }
`;

const StyledSpan = styled.span`
  color: white;
  text-transform: uppercase;
  text-align: center;
  a {
    margin-left: 1rem;
    color: #4e0eff;
    text-decoration: none;
    font-weight: bold;
    margin-top: 0.5rem;
    @media screen and (max-width: 425px) {
      display: block;
      margin-top: 1rem;
    }
  }
`;

function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, email, username } = values;

      const { data } = await axios.post(registerRoute, {
        username,
        password,
        email,
      });
      if (data.status === false) {
        toast.error(data.msg, toastSetup);
      }
      if (data.status === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { username, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error(
        "Password and Confirm Password fields must match.",
        toastSetup
      );
      return false;
    } else if (username.length < 3) {
      toast.error("Username must contain at least 3 characters", toastSetup);
      return false;
    } else if (password.length < 8 || !validatePassword(password)) {
      toast.error(
        "Password must contain at least 1 number, 1 special character, 1 uppercase letter and must be longer that 8 characters",
        toastSetup
      );
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <FormContainerDiv>
        <StyledForm onSubmit={(event) => handleSubmit(event)}>
          <BrandDiv className="brand">
            <StyledImg src={logo} alt="logo" />
            <StyledTitleH1>GrooveChat</StyledTitleH1>
          </BrandDiv>
          <StyledInput
            type="text"
            placeholder="Username"
            autoComplete="username"
            id="username"
            required
            name="username"
            onChange={handleChange}
          />
          <StyledInput
            type="email"
            required
            autoComplete="email"
            placeholder="Email"
            id="email"
            name="email"
            onChange={handleChange}
          />
          <StyledInput
            type="password"
            autoComplete="password"
            placeholder="Password"
            required
            id="password"
            name="password"
            onChange={handleChange}
          />
          <StyledInput
            type="password"
            required
            autoComplete="confirmPassword"
            placeholder="Confirm password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
          />
          <StyledButton type="submit"> Create User</StyledButton>
          <StyledSpan>
            Already have an account?
            <Link to={"/login"}>login</Link>
          </StyledSpan>
        </StyledForm>
      </FormContainerDiv>
      <ToastContainer />
    </>
  );
}

export default Register;
