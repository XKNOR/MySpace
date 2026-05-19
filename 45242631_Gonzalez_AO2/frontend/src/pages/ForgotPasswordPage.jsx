
import { TextField, Button } from '@mui/material';
import api from '../utils/api';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    await api.post('/api/auth/forgot-password', { email });
    toast.success('Instrucciones enviadas a tu email');
  };

  return (
    <form>
      <TextField 
        label="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <Button onClick={handleSubmit}>Recuperar</Button>
    </form>
  );
};