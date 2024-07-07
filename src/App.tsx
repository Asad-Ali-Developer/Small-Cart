import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { RiDeleteBin6Line } from "react-icons/ri";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItem = Product & {
  quantity: number;
};

const products: Product[] = [
  { id: 1, name: 'Luxury Chair', price: 29.99, image: 'https://nooranisurgical.com/wp-content/uploads/2021/04/chair-2@2x.jpg' },
  { id: 2, name: 'Lenovo Laptop', price: 1149.99, image: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/PDP-Highlight-Surface-Laptop-Go-2-Ice-Blue:VP2-859x540' },
  { id: 3, name: 'Abris Modem', price: 49.99, image: 'https://cdn.thewirecutter.com/wp-content/media/2024/03/router-vs-modem-2048px-7397.jpg?auto=webp&quality=75&width=1024' },
];

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);


  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      } else {

        return [...prevCart, { ...product, quantity: 1 }];
      }
    })
  };

  const increaseQuantity = (productId: number) => {
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (productId: number) => {
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    ));
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId)
    )
  }


  return (


    <div className="App">
      <Navbar />

      <h1>Shopping Cart</h1>

      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product">
            <div className="img">
              <img src={product.image} alt={product.name} />
            </div>
            <h2 className='productName'>{product.name}</h2>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Cart</h2>
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            
            <div className="imgCart">
              <img src={item.image} alt="Cart-Image" />
            </div>

            <span className='cartItemName'>{item.name}</span>
            <span className='price'>${item.price.toFixed(2)}</span>
            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
            </div>
            <div className='delBtn' onClick={() => removeFromCart(item.id)}><RiDeleteBin6Line />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
