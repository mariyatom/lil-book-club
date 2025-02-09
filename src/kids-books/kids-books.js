document.addEventListener('DOMContentLoaded', function () {
  const cartCountElement = document.getElementById('cart-count')
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn')
  const products = document.querySelectorAll('.product')
  const checkboxes = document.querySelectorAll(".filter input[type='checkbox']")
  const priceRange = document.getElementById('priceRange')
  const priceValue = document.getElementById('priceValue')
  const clearAllButton = document.getElementById('clearAllFilters')

  let cartData = JSON.parse(localStorage.getItem('cartData')) || {} // Load stored cart data

  const cartContainer = document.querySelector('.cart-container')
  // Set the total cart count in header
  updateCartCount()
  // Initial filter on page load
  filterProducts()
  // Redirect to cart.html when clicking on the cart icon
  cartContainer.addEventListener('click', function () {
    window.location.href = '../cart/cart.html' // Change to the correct path of your cart page
  })
  priceRange.addEventListener('input', function () {
    priceValue.textContent = priceRange.value
  })

  console.log('Total products found:', products.length)
  console.log('Total checkboxes found:', checkboxes.length)

  // Function to update the total cart count and price in the header
  function updateCartCount() {
    let totalCount = 0
    let totalPrice = 0

    Object.values(cartData).forEach((item) => {
      totalCount += item.count
      totalPrice += item.count * item.price
    })

    cartCountElement.textContent = totalCount
    cartCountElement.style.visibility = totalCount > 0 ? 'visible' : 'hidden'

    // Optionally, you can show the total price somewhere (e.g., in the cart icon)
    localStorage.setItem('cartCount', totalCount) // Store count in localStorage
    localStorage.setItem('cartTotalPrice', totalPrice.toFixed(2)) // Store total price in localStorage
  }

  // Function to update item count and price near each button
  function updateItemCount(button, count, price) {
    let itemCountElement = button.querySelector('.item-count')
    if (!itemCountElement) {
      itemCountElement = document.createElement('span')
      itemCountElement.classList.add('item-count')
      button.prepend(itemCountElement)
    }
    itemCountElement.textContent =
      count > 0 ? `${count} ($${(count * price).toFixed(2)})` : ''
  }

  // Initial setup: Load stored counts and prices
  addToCartButtons.forEach((button) => {
    const productName = button
      .closest('.product')
      .querySelector('h3')
      .textContent.trim() // Get product name
    const productPrice = parseFloat(
      button
        .closest('.product')
        .querySelector('.new-price')
        .textContent.replace('$', '')
    ) // Get product price (assuming the price is in a `.new-price` element)

    // Default product data
    if (!cartData[productName]) {
      cartData[productName] = { count: 0, price: productPrice }
    }

    updateItemCount(button, cartData[productName].count, productPrice)

    // Add click event listener
    button.addEventListener('click', function () {
      cartData[productName].count++
      localStorage.setItem('cartData', JSON.stringify(cartData)) // Store in localStorage
      updateItemCount(button, cartData[productName].count, productPrice)
      updateCartCount()
    })
  })

  // Function to filter products
  function filterProducts() {
    console.log('Filtering products...')
    const selectedBrands = Array.from(
      document.querySelectorAll("input[name='brand']:checked")
    ).map((cb) => cb.value)
    const selectedAges = Array.from(
      document.querySelectorAll("input[name='age']:checked")
    ).map((cb) => cb.value)
    const maxPrice = parseFloat(priceRange.value)

    console.log('Selected brands:', selectedBrands)
    console.log('Selected ages:', selectedAges)
    console.log('Max price selected:', maxPrice)

    products.forEach((product) => {
      const brand = product.getAttribute('data-brand')
      const age = product.getAttribute('data-age')
      const price = parseFloat(product.getAttribute('data-price'))

      console.log(
        `Product: ${
          product.querySelector('h3').textContent
        }, Brand: ${brand}, Age: ${age}, Price: ${price}`
      )

      // Check brand and age filters
      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(brand)
      const ageMatch = selectedAges.length === 0 || selectedAges.includes(age)
      const priceMatch = price <= maxPrice

      console.log(
        `Brand match: ${brandMatch}, Age match: ${ageMatch}, Price match: ${priceMatch}`
      )

      // Show/hide product based on matching filters
      if (brandMatch && ageMatch && priceMatch) {
        product.style.display = 'block'
        console.log('Product displayed')
      } else {
        product.style.display = 'none'
        console.log('Product hidden')
      }
    })
  }

  // Event listeners for checkboxes
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      console.log('Checkbox changed:', this.name, this.value, this.checked)
      filterProducts()
    })
  })

  // Event listener for price range
  priceRange.addEventListener('input', function () {
    priceValue.textContent = priceRange.value
    filterProducts()
  })

  clearAllButton.addEventListener('click', function () {
    checkboxes.forEach((checkbox) => (checkbox.checked = false))
    priceRange.value = priceRange.max // Reset price
    priceValue.textContent = priceRange.max
    filterProducts()
  })
  document.querySelectorAll('.remove-item').forEach((removeBtn) => {
    removeBtn.addEventListener('click', function (event) {
      event.stopPropagation() // Prevent triggering add-to-cart
      const button = this.closest('.add-to-cart-btn')
      const productName = button
        .closest('.product')
        .querySelector('h3')
        .textContent.trim()

      if (cartData[productName] && cartData[productName].count > 0) {
        cartData[productName].count--
        if (cartData[productName].count === 0) delete cartData[productName]
        localStorage.setItem('cartData', JSON.stringify(cartData))
        updateItemCount(
          button,
          cartData[productName]?.count || 0,
          cartData[productName]?.price || 0
        )
        updateCartCount()
      }
    })
  })
})
