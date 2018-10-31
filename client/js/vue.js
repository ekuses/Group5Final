var example1 = new Vue({
  el: '#movie-app',
  data: {
    movies: [

      {
        name: 'A Star is Born',
        image: {url: 'images/A-Star-Is-Born.jpg',
                alt: 'A star is born poster art'}
      },

      { name: 'Venom',
        image: {url: 'images/Venom.jpg',
                alt: 'A star is born poster art'}
      },

      { name: 'First Man',
        image: {url: 'images/First-Man.jpg',
                alt: 'A star is born poster art'}
      },

      { name: 'Bohemian Rhapsody',
        image: {url: 'images/Bohemian-Rhapsody.jpg',
                alt: 'A star is born poster art'}
      },

      { name: 'Halloween',
        image: {url: 'images/Halloween.jpg',
                alt: 'A star is born poster art'}
      }
    ]
  }
})
