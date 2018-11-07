var example1 = new Vue({
  el: '#movie-app',
  data: {
    movies: [

      {
        name: 'A Star is Born',
        image: {url: 'images/A-Star-Is-Born.jpg',
                alt: 'A star is born poster art'},
        times: ['1:00PM', '2:00PM', '3:00PM']
      },

      { name: 'Venom',
        image: {url: 'images/Venom.jpg',
                alt: 'A star is born poster art'},
        times: ['2:00PM', '3:00PM', '4:00PM']
      },

      { name: 'First Man',
        image: {url: 'images/First-Man.jpg',
                alt: 'A star is born poster art'},
        times: ['3:00PM', '4:00PM', '5:00PM']
      },

      { name: 'Bohemian Rhapsody',
        image: {url: 'images/Bohemian-Rhapsody.jpg',
                alt: 'A star is born poster art'},
        times: ['4:00PM', '5:00PM', '6:00PM']
      },

      { name: 'Halloween',
        image: {url: 'images/Halloween.jpg',
                alt: 'A star is born poster art'},
        times: ['5:00PM', '6:00PM', '7:00PM']
      }
    ],
    notClicked: true,
    name: "",
    times: [""]
  },
  methods: {
    handleClick(name, times){
      notClicked = false;
      this.name = name;
      this.times = times;
    }
  }
})
var example2 = new Vue({
  el: '#movie-shows',
  data: {
    movies: [

      {
        name: 'A Star is Born',
        image: {url: 'images/A-Star-Is-Born.jpg',
                alt: 'A star is born poster art'},
        times: ['1:00PM', '2:00PM', '3:00PM']
      },

      { name: 'Venom',
        image: {url: 'images/Venom.jpg',
                alt: 'A star is born poster art'},
        times: ['2:00PM', '3:00PM', '4:00PM']
      },

      { name: 'First Man',
        image: {url: 'images/First-Man.jpg',
                alt: 'A star is born poster art'},
        times: ['3:00PM', '4:00PM', '5:00PM']
      },

      { name: 'Bohemian Rhapsody',
        image: {url: 'images/Bohemian-Rhapsody.jpg',
                alt: 'A star is born poster art'},
        times: ['4:00PM', '5:00PM', '6:00PM']
      },

      { name: 'Halloween',
        image: {url: 'images/Halloween.jpg',
                alt: 'A star is born poster art'},
        times: ['5:00PM', '6:00PM', '7:00PM']
      }
    ],
    notClicked: true,
    name: "",
    times: [""]
  },
  methods: {
    handleClick(name, times){
      notClicked = false;
      this.name = name;
      this.times = times;
    }
  }
})
