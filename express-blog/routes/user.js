var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
    const {username,password} = req.body
  res.json({
      errno:0,
      data:{username,password}
  })
});

module.exports = router;
