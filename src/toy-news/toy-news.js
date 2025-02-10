document.addEventListener('DOMContentLoaded', function () {
  const toyNewsContainer = document.getElementById('toy-news-container')

  // Fetch JSON data
  fetch('../toyNews.json')
    .then((response) => response.json())
    .then((toyNews) => {
      toyNews.forEach((news, index) => {
        const article = document.createElement('div')
        article.classList.add('news-card')

        article.innerHTML = `
      <img src="${news.image}" alt="${news.title}" />
      <div class="news-content">
        <h3>${news.title}</h3>
        <p><b>${news.date}</b></p>
        <p>${news.description}</p>
        <a href="../news-detail/news-detail.html?index=${index}" class="read-more">Read more</a>
      </div>
    `

        toyNewsContainer.appendChild(article)
      })
    })
    .catch((error) => console.error('Error loading toy news:', error))
})
