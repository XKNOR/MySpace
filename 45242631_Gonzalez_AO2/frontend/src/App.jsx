import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BlogCreatePage from "./pages/BlogCreatePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", paddingTop: "20px" }}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/create-blog" element={<BlogCreatePage />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </>
  );
}

export default App;
