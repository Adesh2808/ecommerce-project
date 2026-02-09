import { useAuth } from '../AuthContext';

const Saved = () => {
  const { saved } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Saved Products</h1>
      {saved.length === 0 ? <p>No saved products</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
          {saved.map(product => (
            <div key={product.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', background: '#f9f9f9' }}>
              <img src={product.image} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;