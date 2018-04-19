Vue.component('review-stars', {
  template : `<div class="star-rating">
        <label class="star-rating-star" v-for="rating in ratings"
        :class="{'is-selected': ((value >= rating) && value != null), 'is-disabled': disabled}"
        v-on:click="updateValue(rating)" v-on:mouseover="updateValue(rating)" v-on:mouseout="updateValue(rating)">
        <input class="star-rating star-rating-checkbox" type="radio" :value="rating"
        v-model="value" :disabled="disabled">★</label></div>`,

  props: ['value','disabled'],

  data : function() {
    return {
      ratings : [1, 2, 3, 4, 5]
    };
  },

  methods : {
    updateValue: function(value) {
      if (!this.disabled) {
        this.$emit('input', value);
      }
    }
  }
});

var myVideoApp = {
  // do more non-VM related stuff here
  addReviews(data) {
    // process the review data and push it into the Vue instance
    data.forEach(review => myVideoApp.vm.reviews.push(review));
  },



  vm : new Vue({
    delimiters: ["${", "}"],

    el : "#video",

    data : {
      reviews : [],
      numStars : 0,
      review : "",
      name : ""

      // testMessage : "testing to see if this works"
    },

    methods: {
      // do a post with all the new review stuff
      addReview() {
        // do a fetch here
        let movieId = document.querySelector('.movId').textContent; // grab the movie id

        axios.post('/api', {
          id : movieId,
          stars : this.numStars,
          comment : this.review,
          name : this.name
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });

          // push things to the reviews array
          this.reviews.push({
            comments_copy : this.review,
            comments_rating : this.numStars,
            comments_date : `${ new Date() }`,
            comments_name : this.name
          });

          this.review = "";
          this.numStars = 0;
          this.name = "";
        }

      }
  })
};

console.log(location);

var pageLink = location;

Vue.use(SocialSharing);
myVideoApp.addReviews(appData.movies);


