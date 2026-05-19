import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { TextField, Button, Typography, Box, List, ListItem, CircularProgress, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const currentUserId = token ? JSON.parse(atob(token.split(".")[1])).id : null;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/comments/${blogId}`);
        setComments(res.data);
      } catch (err) { console.error(err); }
    };
    if (blogId) fetchComments();
  }, [blogId]);

  const handleSend = async () => {
    if (!newComment.trim()) return;
    setLoading(true);
    try {
      const res = await api.post("/comments", { content: newComment, blogId: Number(blogId) });
      setComments([...comments, res.data]);
      setNewComment("");
    } catch (err) { toast.error("Error al comentar"); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Borrar?")) return;
    try {
      await api.delete(`/comments/${id}`);
      setComments(comments.filter(c => c.id !== id));
      toast.info("Eliminado");
    } catch (err) { toast.error("No se pudo borrar"); }
  };

  return (
    <Box sx={{ mt: 2, borderTop: "1px dashed #ff00ff", pt: 1 }}>
      <List>
        {comments.map((c) => (
          <ListItem key={c.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 0 }}>
            <Typography variant="body2" sx={{ color: "#fff" }}>
              <strong style={{ color: "#00ffff" }}>{c.author?.username}:</strong> {c.content}
            </Typography>
            {Number(c.userId) === Number(currentUserId) && (
              <IconButton onClick={() => handleDelete(c.id)} sx={{ color: "#ff4444" }}><DeleteIcon sx={{ fontSize: "1rem" }} /></IconButton>
            )}
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <TextField size="small" fullWidth value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Escribir..." sx={{ input: { color: "white" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#ff00ff" } } }} />
        <Button onClick={handleSend} variant="contained" disabled={loading || !newComment.trim()} sx={{ bgcolor: "#ff00ff" }}>{loading ? <CircularProgress size={20} color="inherit" /> : "OK"}</Button>
      </Box>
    </Box>
  );
};
export default CommentSection;
