Vue.config.devtools = true;

var app = new Vue({
  el: '#root',
  data: {
    risultati: [],
    api_key: 'bd0d6cf8c8039f80c4927c83d9525715',
    lang: 'it',
    uri: 'https://api.themoviedb.org/3',
    query: '',
    placeholder: 'https://www.associazioneostetriche.it/wp-content/uploads/2018/05/immagine-non-disponibile.png',
    show: true
  },

  methods: {
    search: function () {
      this.show = false;
      this.risultati = [];
      axios.get(`${this.uri}/search/movie?api_key=${this.api_key}&query=${this.query}&language=${this.lang}`)
      .then((response) => {
        this.risultati = [...this.risultati, ...response.data.results]
      });
      axios.get(`${this.uri}/search/tv?api_key=${this.api_key}&query=${this.query}&language=${this.lang}`)
      .then((response) => {
        this.risultati = [...this.risultati, ...response.data.results]
      });
    },

    clear: function() {
      this.risultati = []
    },
    GetTitle: function(obj){
      if (obj.title) {
        return obj.title;
      } else {
        return obj.name;
      }
    },
    GetOriginaltitle: function(obj){
      if (obj.original_title) {
        return obj.original_title;
      } else {
        return obj.original_name;
      }
    },
    votoStelle: function (vote) {
     let stellapiena = '';
     let stellavuota = '';
     for (var i = 1; i <= 5; i++) {
       if (i <= Math.round(vote / 2)) {
         stellapiena += '<i class="fas fa-star"></i>';
       } else {
         stellavuota += '<i class="far fa-star"></i>';
       }
     }
     return `${stellapiena}${stellavuota}`;
    },
  }
})
