// Example usage of Redux in your Next.js app

// 1. First, wrap your app with ReduxProvider in your main layout or _app.js:

/*
// In app/layout.js or pages/_app.js
import { ReduxProvider } from './redux';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
*/

// 2. Using the cart in a component:

/*
import { useCart } from '../redux';

function ProductCard({ product }) {
  const {
    addItem,
    removeItem,
    isItemInCart,
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity
  } = useCart();

  const isInCart = isItemInCart(product.id);
  const quantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      sale: product.sale,
      images: product.images,
      vendor: product.vendor,
      stock: product.stock
    });
  };

  return (
    <div>
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      
      {isInCart ? (
        <div>
          <button onClick={() => decreaseItemQuantity(product.id)}>-</button>
          <span>Quantity: {quantity}</span>
          <button onClick={() => increaseItemQuantity(product.id)}>+</button>
          <button onClick={() => removeItem(product.id)}>Remove from Cart</button>
        </div>
      ) : (
        <button onClick={handleAddToCart}>Add to Cart</button>
      )}
    </div>
  );
}
*/

// 3. Using the wishlist in a component:

/*
import { useWishlist } from '../redux';

function WishlistButton({ product }) {
  const { toggleItem, isItemInWishlist } = useWishlist();
  
  const isInWishlist = isItemInWishlist(product.id);

  const handleToggleWishlist = () => {
    toggleItem({
      id: product.id,
      title: product.title,
      price: product.price,
      sale: product.sale,
      images: product.images,
      vendor: product.vendor,
      stock: product.stock,
      description: product.description
    });
  };

  return (
    <button onClick={handleToggleWishlist}>
      {isInWishlist ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist'}
    </button>
  );
}
*/

// 4. Cart sidebar component:

/*
import { useCart } from '../redux';

function CartSidebar() {
  const {
    items,
    totalItems,
    totalPrice,
    isOpen,
    close,
    removeItem,
    updateItemQuantity,
    clear
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="cart-sidebar">
      <div className="cart-header">
        <h2>Shopping Cart ({totalItems})</h2>
        <button onClick={close}>✕</button>
      </div>
      
      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.images?.[0]?.url} alt={item.title} />
            <div>
              <h4>{item.title}</h4>
              <p>${item.sale || item.price}</p>
              <input
                type="number"
                min="1"
                max={item.stock}
                value={item.quantity}
                onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value))}
              />
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-footer">
        <div>Total: ${totalPrice.toFixed(2)}</div>
        <button onClick={clear}>Clear Cart</button>
        <button>Checkout</button>
      </div>
    </div>
  );
}
*/

// 5. Wishlist page component:

/*
import { useWishlist } from '../redux';

function WishlistPage() {
  const {
    items,
    totalItems,
    sort,
    clear,
    removeItem,
    moveItemToCart,
    searchItems
  } = useWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('dateAdded');

  const filteredItems = searchQuery 
    ? searchItems(searchQuery) 
    : items;

  return (
    <div>
      <h1>My Wishlist ({totalItems} items)</h1>
      
      <div className="wishlist-controls">
        <input
          type="text"
          placeholder="Search wishlist..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <select value={sortBy} onChange={(e) => {
          setSortBy(e.target.value);
          sort(e.target.value);
        }}>
          <option value="dateAdded">Recently Added</option>
          <option value="title">Name</option>
          <option value="price">Price</option>
          <option value="vendor">Vendor</option>
        </select>
        
        <button onClick={clear}>Clear All</button>
      </div>
      
      <div className="wishlist-items">
        {filteredItems.map(item => (
          <div key={item.id} className="wishlist-item">
            <img src={item.images?.[0]?.url} alt={item.title} />
            <div>
              <h4>{item.title}</h4>
              <p>${item.sale || item.price}</p>
              <p>Added: {new Date(item.dateAdded).toLocaleDateString()}</p>
              <button onClick={() => moveItemToCart(item.id)}>Move to Cart</button>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
*/

export {};
