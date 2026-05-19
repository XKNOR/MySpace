import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";
import CommentSection from "../components/CommentSection";

const DashboardPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Error al cargar blogs", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <Container sx={{ mt: 4, pb: 10 }}>
      <Typography variant="h4" sx={{ color: "#ff00ff", textAlign: "center", mb: 4, fontWeight: "bold" }}>
        ★ EL MURO DE LA COMUNIDAD ★
      </Typography>
      
      {blogs.map((blog) => {
        // Chequeamos ambos nombres posibles del campo de imagen
        let imagePath = blog.image || blog.imageUrl;
        let fullUrl = null;

        if (imagePath) {
          // 🛠️ Corrección para Windows: reemplaza \ por / y asegura la barra / inicial
          imagePath = imagePath.replace(/\\/g, "/");
          if (!imagePath.startsWith("/")) {
            imagePath = "/" + imagePath;
          }
          fullUrl = `http://localhost:5000${imagePath}`;
        }

        // Compatibilidad por si viene como id o _id de la base de datos
        const blogId = blog._id || blog.id;

        return (
          <Card key={blogId} sx={{ mb: 4, bgcolor: "#000", border: "2px solid #ff00ff", color: "#fff" }}>
            {fullUrl && (
              <Box sx={{ width: "100%", textAlign: "center", borderBottom: "1px solid #333" }}>
                <img src={fullUrl} alt="Post" style={{ width: "100%", maxHeight: "500px", objectFit: "contain" }} />
              </Box>
            )}
            <CardContent>
              <Typography variant="h5" sx={{ color: "#00ffff" }}>{blog.title}</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>{blog.content}</Typography>
              <Typography variant="caption" sx={{ color: "#ff00ff", mt: 2, display: "block" }}>
                Por: {blog.author?.username || "Usuario"}
              </Typography>
              <CommentSection blogId={blogId} />
            </CardContent>
          </Card>
        );
      })}
    </Container>
  );
};

export default DashboardPage;
