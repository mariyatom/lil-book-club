document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search)
  const index = params.get('index')
  const additionalDetail = `There's always something exciting for everyone, from intricate 
  LEGO architecture models to playful sets that spark creativity in kids. 
  Whether you're a seasoned collector or just getting started, these new 
  LEGO sets promise hours of fun and imagination. In addition, if you're looking 
  for new adventures, the Little Book Club is an ideal place to discover a wide 
  variety of children's books that inspire young readers. With engaging stories and characters, 
  the club offers books that nurture creativity and curiosity, making it a wonderful resource for parents, 
  educators, and young readers alike. Whether building with LEGO or diving into a great book, 
  there's plenty to explore and enjoy!`

  // Fetch JSON data
  fetch('../toyNews.json')
    .then((response) => response.json())
    .then((toyNews) => {
      if (index !== null && toyNews[index]) {
        const news = toyNews[index]

        document.getElementById('news-title').textContent = news.title
        document.getElementById('news-title-detail').textContent = news.title
        document.getElementById('news-date').textContent = news.date
        document.getElementById('news-image').src = news.image
        document.getElementById('news-full-content').innerHTML =
          news.fullContent + '<br>' + additionalDetail
      } else {
        document.getElementById('news-title').textContent = 'News Not Found'
        document.getElementById('news-full-content').textContent =
          "Oops! We couldn't find this news article."
      }
    })
    .catch((error) => console.error('Error loading toy news:', error))
})
