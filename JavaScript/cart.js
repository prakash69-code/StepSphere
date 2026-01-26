// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartIcon = document.querySelector('.icons .fa-shopping-cart');
  const addToCartButtons = document.querySelectorAll('.btn-add-cart');

  // Create cart badge
  function createCartBadge() {
    let cartBadge = document.querySelector('.cart-badge');
    if (!cartBadge && cartIcon) {
      cartBadge = document.createElement('span');
      cartBadge.className = 'cart-badge';
      cartBadge.style.cssText = 'position: absolute; top: -8px; right: -8px; background: #e74c3c; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; justify-content: center; align-items: center; font-size: 12px; font-weight: bold;';
      if (cartIcon.parentNode) {
        cartIcon.parentNode.style.position = 'relative';
        cartIcon.parentNode.appendChild(cartBadge);
      }
    }
    return cartBadge;
  }

  const cartBadge = createCartBadge();
  updateCartBadge();

  // Update cart badge
  function updateCartBadge() {
    const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    if (cartBadge) {
      cartBadge.textContent = totalItems;
      cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
  }

  // Add to cart functionality
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.product-card') || this.closest('.product-detail-container');
      if (!productCard) return;

      const productTitle = productCard.querySelector('h3')?.textContent || productCard.querySelector('.product-title')?.textContent || 'Product';
      const productPrice = productCard.querySelector('.price')?.textContent || '$0';
      const productImage = productCard.querySelector('img')?.src || '';

      const newItem = {
        title: productTitle,
        price: productPrice,
        image: productImage,
        quantity: 1,
        id: Date.now()
      };

      const existingItem = cartItems.find(item => item.title === productTitle);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push(newItem);
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      updateCartBadge();

      // Show feedback
      const originalText = this.textContent || this.innerHTML;
      this.textContent = 'Added!';
      setTimeout(() => {
        this.textContent = originalText;
      }, 1500);
    });
  });

  // Global addToCart function for onclick handlers
  window.addToCart = function() {
    const productCard = document.querySelector('.product-detail-container');
    if (!productCard) {
      alert('Product added to cart!');
      return;
    }

    const productTitle = productCard.querySelector('.product-title')?.textContent || 'Product';
    const productPrice = productCard.querySelector('.price')?.textContent || '$0';
    const productImage = productCard.querySelector('img')?.src || '';

    const newItem = {
      title: productTitle,
      price: productPrice,
      image: productImage,
      quantity: 1,
      id: Date.now()
    };

    const existingItem = cartItems.find(item => item.title === productTitle);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push(newItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartBadge();
    alert('Product added to cart!');
  };

  // Cart icon click
  if (cartIcon && cartIcon.parentNode) {
    cartIcon.parentNode.style.cursor = 'pointer';
    cartIcon.parentNode.addEventListener('click', function() {
      const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
      if (totalItems === 0) {
        alert('Your cart is empty');
      } else {
        alert('Cart has ' + totalItems + ' item(s)');
      }
    });
  }
});
