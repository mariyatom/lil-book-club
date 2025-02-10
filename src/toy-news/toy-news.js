document.addEventListener('DOMContentLoaded', function () {
  const toyNewsContainer = document.getElementById('toy-news-container')

  const toyNews = [
    {
      title: 'New LEGO Set Released!',
      date: 'Feb 10, 2025',
      image: './src/assets/lego.jpg',
      description: 'LEGO has just launched a new superhero set for kids!',
    },
    {
      title: 'Top 5 Educational Toys in 2025',
      date: 'Feb 8, 2025',
      image: './src/assets/edu-toys.jpg',
      description: 'Discover the best toys that help kids learn while playing!',
    },
    {
      title: 'Remote Control Cars Are Back!',
      date: 'Feb 5, 2025',
      image: './src/assets/rc-car.jpg',
      description: 'The latest RC cars have advanced features and new designs.',
    },
  ]

  toyNews.forEach((news) => {
    const article = document.createElement('div')
    article.classList.add('toy-article')

    article.innerHTML = `
      <img src="${news.image}" alt="${news.title}" />
      <h3>${news.title}</h3>
      <p><b>${news.date}</b></p>
      <p>${news.description}</p>
    `

    toyNewsContainer.appendChild(article)
  })
})
