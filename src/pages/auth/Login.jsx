import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo.svg";
import { toastSetup } from "../../utils/generalConsts";
import axios from "axios";
import { loginRoute } from "../../utils/APIRoutes";
import { useDispatch } from "react-redux";
import { addUser } from "../../features/loginSlice";

const FormContainerDiv = styled.div`
  height: 100vh;
  width: 100vw;
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
  gap: 2rem;
  background-color: #00000076;
  border-radius: 2rem;
  padding: 3rem 5rem;
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
    @media screen and (max-width: 550px) {
      display: block;
      margin-top: 1rem;
    }
  }
`;

function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;

      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastSetup);
      }
      if (data.status === true) {
        dispatch(addUser(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { username, password } = values;

    if (password === "") {
      toast.error("Password can not be empty.", toastSetup);
      return false;
    } else if (username === "") {
      toast.error("Username can not be empty", toastSetup);
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
            min={3}
            name="username"
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

          <StyledButton type="submit"> Login User</StyledButton>
          <StyledSpan>
            Do not have an account?
            <Link to={"/register"}>Register</Link>
          </StyledSpan>
        </StyledForm>
      </FormContainerDiv>
      <ToastContainer />
    </>
  );
}

export default Login;
