import { useAuth } from '../AuthContext';

const Home = () => {
  const { user } = useAuth();
  return (
    <div style={{ padding: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '80vh', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1>Welcome to Ecommerce</h1>
      {user && <h2>Hello, {user.name}!</h2>}
      <p>Discover amazing products and manage your cart!</p>
    </div>
  );
};

export default Home;