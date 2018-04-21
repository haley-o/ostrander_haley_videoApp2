var express = require('express');
var videoController = require('../controllers/videoAppController');
var router = express.Router();

/* GET home page. */
router.get('/', videoController.get_all_movies);

router.get('/movies/:id/:movie', videoController.get_one_movie );

// router.get('/api/:id/:movie', videoController.get_movie_details);

router.post('/api', videoController.post_new_review);

module.exports = router;
