Vue.config.devtools = true;

var app = new Vue({
  el: '#root',
  data: {
    risultati: ["..."],
    api_key: 'bd0d6cf8c8039f80c4927c83d9525715',
    lang: 'it',
    uri: 'https://api.themoviedb.org/3',
    query: '',
    placeholder: 'https://img.icons8.com/ios/452/image-not-avialable.png',
    hover: false
  },
  mounted(){
    //axios.get(`${this.poster}/w342?api_key=${this.api_key}`)
    //.then((response) => {
    //  console.log(response);
    //})
    axios.get(`${this.uri}/search/movie?api_key=${this.api_key}`)
    .then((response) => {
      console.log(response.data.results.backdrop_path);
    })
  },
  methods: {
    search: function () {
    axios.get(`${this.uri}/search/movie?api_key=${this.api_key}&query=${this.query}&language=${this.lang}`)
    .then((response) => {
      this.risultati = [...this.risultati, ...response.data.results]
      if (!this.risultati.poster.path) {
      this.risultati.poster_path = this.placeholder
      }
    })
    axios.get(`${this.uri}/search/tv?api_key=${this.api_key}&query=${this.query}&language=${this.lang}`)
    .then((response) => {
      this.risultati = [...this.risultati, ...response.data.results]
    })
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

}
  })
