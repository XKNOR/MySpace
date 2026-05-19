import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogCreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    // IMPORTANTE: El nombre "image" debe coincidir con el backend
    if (image) formData.append("image", image); 

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/blogs", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}` 
        },
      });
      navigate("/");
    } catch (err) {
      console.error("Error al crear post", err.response?.data || err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, bgcolor: "rgba(0,0,0,0.8)", p: 4, borderRadius: 2, border: "2px solid #ff00ff" }}>
      <Typography variant="h4" sx={{ color: "#00ffff", mb: 3, textAlign: "center" }}>CREAR NUEVO POST</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Título" variant="outlined" margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ input: { color: "white" }, label: { color: "#ff00ff" } }} />
        <TextField fullWidth label="Contenido" multiline rows={4} variant="outlined" margin="normal" value={content} onChange={(e) => setContent(e.target.value)} sx={{ textarea: { color: "white" }, label: { color: "#ff00ff" } }} />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} style={{ margin: "20px 0", color: "white" }} />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, bgcolor: "#ff00ff", fontWeight: "bold" }}>
          PUBLICAR EN EL MURO
        </Button>
      </form>
    </Container>
  );
};

export default BlogCreatePage;
