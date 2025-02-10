document.addEventListener('DOMContentLoaded', function () {
  const cartListElement = document.getElementById('cart-list')
  const totalPriceElement = document.getElementById('total-price')
  const checkoutBtn = document.getElementById('checkout-btn')

  let cartData = JSON.parse(localStorage.getItem('cartData')) || {}

  // Function to render the cart items
  function renderCartItems() {
    let totalPrice = 0
    cartListElement.innerHTML = '' // Clear the cart list before re-rendering

    Object.entries(cartData).forEach(([productName, { count, price }]) => {
      if (count > 0) {
        const productElement = document.createElement('div')
        productElement.classList.add('cart-item')

        productElement.innerHTML = `
          <span class="product-name">${productName}</span>
          <span class="product-quantity">${count} x $${price.toFixed(2)}</span>
          <span class="product-total-price">$${(count * price).toFixed(
            2
          )}</span>
          <button class="remove-item-btn">Remove</button>
        `

        // Add the total price for the product to the cart total
        totalPrice += count * price

        // Remove item functionality
        productElement
          .querySelector('.remove-item-btn')
          .addEventListener('click', function () {
            cartData[productName].count = 0 // Remove the item from the cart
            localStorage.setItem('cartData', JSON.stringify(cartData)) // Update the cart in localStorage
            renderCartItems() // Re-render the cart after removal
          })

        cartListElement.appendChild(productElement)
      }
    })

    // Update the total price in the cart summary
    totalPriceElement.textContent = totalPrice.toFixed(2)

    // If the cart is empty, show a message
    if (totalPrice === 0) {
      cartListElement.innerHTML = '<p>Your cart is empty.</p>'
    }
  }

  // Render cart items on page load
  renderCartItems()

  // Checkout button functionality (for now, just an alert)
  checkoutBtn.addEventListener('click', function () {
    if (Object.values(cartData).some((item) => item.count > 0)) {
      alert('Proceeding to checkout...')
      window.location.href = '../payment/payment.html'
    } else {
      alert('Your cart is empty. Add items to the cart first.')
    }
  })
})
