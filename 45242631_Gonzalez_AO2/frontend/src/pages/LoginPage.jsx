import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      toast.success("¡Bienvenido!");
      
      window.location.href = "/";
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error al entrar");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Paper elevation={10} sx={{ p: 4, bgcolor: "#1a1a1a", color: "white", borderRadius: 3, border: "1px solid #00ffff", boxShadow: "0 0 15px #00ffff" }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: "#ff00ff", fontWeight: "bold" }}>Iniciar Sesión</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal" required fullWidth label="Correo" name="email" value={formData.email} onChange={handleChange}
              InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: "#00ffff" }} /></InputAdornment>, style: { color: "white" } }}
              InputLabelProps={{ style: { color: "#aaa" } }}
              sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#333" } } }}
            />
            <TextField
              margin="normal" required fullWidth name="password" label="Contraseña" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Lock sx={{ color: "#00ffff" }} /></InputAdornment>,
                endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: "#aaa" }}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>,
                style: { color: "white" }
              }}
              InputLabelProps={{ style: { color: "#aaa" } }}
              sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#333" } } }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, bgcolor: "#ff00ff", fontWeight: "bold" }}>INGRESAR</Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};
export default LoginPage;
