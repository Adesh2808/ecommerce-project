import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', isRegister: false });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = form.isRegister ? 'http://localhost:5000/api/auth/register' : 'http://localhost:5000/api/auth/login';
      const res = await axios.post(url, form);
      alert(res.data.message);
      if (!form.isRegister) {
        login(res.data.user, res.data.token);
        navigate('/home');
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ padding: '2rem', maxWidth: '400px', width: '100%', background: 'rgba(255,255,255,0.9)', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', color: '#333' }}>
        <h1 style={{ textAlign: 'center' }}>{form.isRegister ? 'Register' : 'Login'}</h1>
        <form onSubmit={handleSubmit}>
          {form.isRegister && <input name="name" placeholder="Name" onChange={handleChange} required style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.75rem', border: 'none', borderRadius: '8px', fontSize: '1rem' }} />}
          <input name="email" placeholder="Email" onChange={handleChange} required style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.75rem', border: 'none', borderRadius: '8px', fontSize: '1rem' }} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.75rem', border: 'none', borderRadius: '8px', fontSize: '1rem' }} />
          <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1rem' }}>{form.isRegister ? 'Register' : 'Login'}</button>
        </form>
        <button onClick={() => setForm({ ...form, isRegister: !form.isRegister })} style={{ marginTop: '1rem', background: 'transparent', border: 'none', color: '#667eea', cursor: 'pointer', textDecoration: 'underline' }}>{form.isRegister ? 'Already have an account? Login' : 'Need to register?'}</button>
      </div>
    </div>
  );
};

export default Login;