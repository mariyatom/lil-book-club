document
  .getElementById('contactForm')
  .addEventListener('submit', function (event) {
    event.preventDefault()
    alert("Thank you for reaching out! We'll get back to you soon.")
    this.reset()
  })
