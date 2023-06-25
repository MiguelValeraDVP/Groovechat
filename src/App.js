import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import SetAvatar from "./pages/SetAvatar";
import ChatContainer from "./components/ChatContainer";
import DynamicBackground from "./components/DynamicBackground";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/set-avatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat />} />
        <Route path="/holis" element={<DynamicBackground />} />

        <Route path={`/chat/:id`} element={<ChatContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
