var express = require('express');
var router = express.Router();
const request = require('request-promise');

/* GET tstuat ui page */
router.get('/', function(req, res) {

  const opts = {
    method: 'GET',
    uri: 'http://tstat.home/tstat',
    json: true
  }
  request(opts)
    .then(function (res1) {
      res.render('tstat', {
        title: 'My TSTAT',
        temp: res1['temp'],
        t_heat: res1['t_heat']
      });
    })
    .catch(function (err) {
      console.log(err);
    })
});

/* POST tstat api */
router.post('/', function(req, res) {

  var temp_int = parseInt(req.body.temp, "10");
  console.log("set temp to: " + temp_int);

  const opts = {
    method: 'POST',
    uri: 'http://tstat.home/tstat',
    body: { "t_heat": temp_int },
    json: true
  }
  request(opts)
    .then(function (res1) {
      console.log(res1)
      res.render('tstat_ack', {
        res1: JSON.stringify(res1)
      });
    })
    .catch(function (err) {
      console.log(err);
    })
});

module.exports = router;
