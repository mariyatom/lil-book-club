// Function to show the payment form when the checkout button is clicked
function showPaymentForm() {
  document.getElementById('paymentSection').style.display = 'block'
  document.getElementById('checkoutButton').style.display = 'none'
}

// Function to handle payment form submission
function handlePayment(event) {
  event.preventDefault() // Prevent form from submitting the traditional way

  // Get values from the form
  const cardNumber = document.getElementById('cardNumber').value
  const expiryDate = document.getElementById('expiryDate').value
  const cvv = document.getElementById('cvv').value

  // Basic validation
  if (cardNumber === '' || expiryDate === '' || cvv === '') {
    showError('Please fill in all the fields.')
    return
  }

  // Simulate a successful payment process (in a real-world app, call a payment API here)
  processPayment(cardNumber, expiryDate, cvv)
}

// Function to simulate payment processing and show confirmation
function processPayment(cardNumber, expiryDate, cvv) {
  // Simulate a delay for payment processing
  setTimeout(function () {
    // Normally  use a payment gateway API here (Stripe, PayPal, etc.), need modifications if you integrate gateway
    document.getElementById('confirmation').innerHTML =
      '<p>Payment Successful! Thank you for your purchase.</p>'
    document.getElementById('confirmation').classList.remove('error')

    // Hide payment form and checkout button
    document.getElementById('paymentSection').style.display = 'none'
  }, 500)
}

// Function to show error messages
function showError(message) {
  const confirmation = document.getElementById('confirmation')
  confirmation.innerHTML = '<p>' + message + '</p>'
  confirmation.classList.add('error')
}
