import React, { useState } from 'react';

const Wishlist = () => {
  // Sample wishlist items
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: 'Item A', price: 500, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Item B', price: 1200, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Item C', price: 700, image: 'https://via.placeholder.com/150' },
  ]);

  // Remove an item from the wishlist
  const handleRemoveFromWishlist = (id) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Move an item to the cart (for demo, we simply log a message and remove it from wishlist)
  const handleAddToCart = (item) => {
    console.log(`"${item.name}" added to cart.`);
    // Optionally, remove the item from the wishlist once it's added to the cart:
    handleRemoveFromWishlist(item.id);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="flex items-center border p-3 rounded">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">Ksh {item.price}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  Remove
                </button>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
