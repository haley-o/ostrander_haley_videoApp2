// handle the routing requests => the request gets passed in via the route
const connect = require('../utils/sqlConnect');

exports.get_all_movies = (req, res) => {
  console.log('hit get all movies');

  connect.getConnection((err, connection) => {
    if (err) {
      return console.log(err.message);
    }

    let query = `SELECT * FROM tbl_movies m, tbl_genre g, tbl_mov_genre mg WHERE m.movies_id = mg.movies_id AND g.genre_id = mg.genre_id`;

    connect.query(query, (err, rows) => {
      connection.release(); // let somebody else use this connection

      if (err) {
        return console.log(err.message);
      }

      console.log(rows);

      res.render('home', {
          defaultMovie : rows[Math.floor(Math.random() * rows.length)],
          data : JSON.stringify(rows),
          mainpage : true,
          videopage : false
      });
    })
  })
};

exports.get_one_movie = (req, res) => {
  console.log('hit get one route');

  connect.getConnection((err, connection) => {
    if (err) {
      return console.log(err.message);
    }

    let movie = `SELECT movies_id, movies_title, movies_storyline, movies_year FROM tbl_movies WHERE movies_id = "${req.params.id}"`;

    let query = `SELECT * FROM tbl_comments WHERE comments_movie = "${req.params.id}"`;

    connect.query(query, (err, rows) => {
    connect.query(movie, (err, movRows) => {
      connection.release(); // let somebody else use this connection

      if (err) {
        return console.log(err.message);
      }

      console.log(rows);

      res.render('moviepage', {
        movie : req.params.id,
        moviesrc : req.params.movie,
        comD : JSON.stringify(rows),
        data : JSON.stringify(movRows),
        moviesData : movRows[0],
        mainpage : false,
        videopage : true
      });
    })
    })
  })
};


exports.post_new_review = (req, res) => {
  console.log('hit post review route');

  connect.getConnection((err, connection) => {
    if (err) {
      return console.log(err.message);
    }

    query = `INSERT INTO tbl_comments (comments_id, comments_auth, comments_copy, comments_date, comments_movie, comments_rating, comments_name) VALUES (NULL, NULL, "${req.body.comment}", CURRENT_TIMESTAMP(), "${req.body.id}", "${req.body.stars}", "${req.body.name}");`;

    connect.query(query, (err, rows) => {
      if (err) {
        return console.log(err.message);
      }

      res.json(rows);
    })
  })
};


// router.post('/', function(req, res) {
//   console.log('post a review');
//
//   connect.query(, (error, data)=> {
//     if (error) {
//       console.log(error);
//     } else {
//       res.json(data);
//     }
//   });
// });
