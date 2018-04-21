const myApp = {
  // some non-VM functionality would go here -> split the movies into genres using Vue
  movieGenres(data, genres) {
    genres.forEach((genre, index) => {
      myApp.vm.genres.push({
        name : genre,
        movies : data.filter(movie => movie.genre_name === genre)
      })
    })
  },

  vm : new Vue({
    el : "#app",

    data : {
      message : "Welcome to my Netflix ripoff!",

      genres : [] // these get populated from the function at the top of the file
    },

    //  overriddenNetworks: {
    //   "facebook": {
    //     "sharer": "https://www.facebook.com/sharer/sharer.php?u=@url&title=@title",
    //     "type": "popup"
    //   },
      
    //   "twitter": {
    //   "sharer": "https://twitter.com/intent/tweet?text=@title&url=@url&hashtags=@hashtags@twitteruser",
    //   "type": "popup"
    //   },
    // },

    methods : {

    },

    delimiters : ["${", "}"]
  })
}

// Vue.use(SocialSharing);

myApp.movieGenres(appData.movies, ["Family", "Action", "Fantasy", "Horror"]);

// new Vue({
//   data: {
//     overriddenNetworks: {
//       "facebook": {
//         "sharer": "https://www.facebook.com/sharer/sharer.php?u=@url&title=@title",
//         "type": "popup"
//       },
      
//       "twitter": {
//       "sharer": "https://twitter.com/intent/tweet?text=@title&url=@url&hashtags=@hashtags@twitteruser",
//       "type": "popup"
//       },
//     }
//   }
// });

// Vue.$root.$on('social_shares_open', function (network, url) {
//   // your event code
// });
