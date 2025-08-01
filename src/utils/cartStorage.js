
export const getCartFromStorage = () => {
  const stored = localStorage.getItem("cart");
  return stored ? JSON.parse(stored) : {};
};

export const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (cart, product) => {
  const existing = cart[product.id];
  const quantity = existing ? existing.quantity + 1 : 1;
  return { ...cart, [product.id]: { product, quantity } };
};

export const removeFromCart = (cart, productId) => {
  const updatedCart = { ...cart };
  if (!updatedCart[productId]) return updatedCart;
  if (updatedCart[productId].quantity === 1) {
    delete updatedCart[productId];
  } else {
    updatedCart[productId].quantity -= 1;
  }
  return updatedCart;
};
