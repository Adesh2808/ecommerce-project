import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { saved, addToSaved, removeFromSaved } = useAuth();

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const isSaved = (id) => saved.some(p => p.id === id);

  return (
    <div style={{ padding: '2rem', background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Products</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '12px', background: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', transition: 'transform 0.2s' }}>
            <img src={product.image} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
            <h3 style={{ color: '#333' }}>{product.title}</h3>
            <p style={{ color: '#666' }}>${product.price}</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => addToCart(product)} style={{ flex: 1, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer' }}>Add to Cart</button>
              <button onClick={() => isSaved(product.id) ? removeFromSaved(product.id) : addToSaved(product.id)} style={{ flex: 1, background: isSaved(product.id) ? '#ff6b6b' : '#4ecdc4', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer' }}>
                {isSaved(product.id) ? 'Unsave' : 'Save'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;