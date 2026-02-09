import { useCart } from '../CartContext';
import axios from 'axios';

const BASE_URL = "https://ecommerce-project-rho-gold.vercel.app";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotal,
    clearCart
  } = useCart();

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please login first');
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/orders`,
        {
          items: cart.map(item => ({
            productId: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity
          })),
          total: getTotal()
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Order placed');
      clearCart();

    } catch (err) {
      alert('Error placing order');
    }
  };

  return (
    <div style={{
      padding: '2rem',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      minHeight: '100vh'
    }}>
      <h1 style={{ textAlign: 'center', color: 'white' }}>Cart</h1>

      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'white' }}>
          Your cart is empty
        </p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #ddd',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '12px',
              background: 'white',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />

              <div>
                <h3 style={{ color: '#333' }}>{item.title}</h3>
                <p style={{ color: '#666' }}>${item.price}</p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <button onClick={() => decreaseQuantity(item.id)}
                    style={minusBtn}>-</button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQuantity(item.id)}
                    style={plusBtn}>+</button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                style={removeBtn}
              >
                Remove
              </button>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h2 style={{ color: 'white' }}>
              Total: ${getTotal().toFixed(2)}
            </h2>

            <button onClick={handleCheckout} style={checkoutBtn}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const minusBtn = {
  background: '#ff6b6b',
  color: 'white',
  border: 'none',
  padding: '0.25rem 0.5rem',
  borderRadius: '4px',
  cursor: 'pointer'
};

const plusBtn = {
  background: '#4ecdc4',
  color: 'white',
  border: 'none',
  padding: '0.25rem 0.5rem',
  borderRadius: '4px',
  cursor: 'pointer'
};

const removeBtn = {
  background: '#ff4757',
  color: 'white',
  border: 'none',
  padding: '0.5rem',
  borderRadius: '8px',
  cursor: 'pointer'
};

const checkoutBtn = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  border: 'none',
  padding: '1rem 2rem',
  borderRadius: '12px',
  cursor: 'pointer',
  fontSize: '1.1rem'
};

export default Cart;
