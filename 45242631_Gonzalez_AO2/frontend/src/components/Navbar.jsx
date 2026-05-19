import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const retroButtonStyle = {
    backgroundColor: '#0000FF !important',
    color: '#FFFFFF !important',
    border: '2px outset #FFFFFF !important',
    borderRadius: '0px !important',
    fontFamily: '"Comic Sans MS", cursive !important',
    fontWeight: 'bold',
    mx: 1,
    '&:hover': {
      backgroundColor: '#0000CD !important',
      border: '2px inset #FFFFFF !important',
    }
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#FF00FF !important',
        borderBottom: '4px solid #00FFFF',
        boxShadow: '0 4px 10px rgba(255, 0, 255, 0.5)'
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: '"Comic Sans MS", cursive !important', fontWeight: 'bold', color: '#00FFFF', textShadow: '2px 2px #000' }}>
          ★ MySpAcE ApP ★
        </Typography>
        
        <Box>
          {/* Si está cargando, no mostramos botones de acción para evitar parpadeos */}
          {!loading && (
            user ? (
              <>
                <Button sx={retroButtonStyle} component={Link} to="/">[ Inicio ]</Button>
                <Button sx={retroButtonStyle} component={Link} to="/create-blog">[ Crear Blog ]</Button>
                <Button sx={retroButtonStyle} onClick={handleLogout}>[ Salir ]</Button>
              </>
            ) : (
              <>
                <Button sx={retroButtonStyle} component={Link} to="/login">[ Entrar ]</Button>
                <Button sx={retroButtonStyle} component={Link} to="/register">[ Unirse ]</Button>
              </>
            )
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
