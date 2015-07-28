var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Venue = require('../models/Venue');

module.exports = function(router) {
  router.use(bodyParser.json());

  router.route('/:venue')
    .get(function(req, res) {
      var venueName = req.params.venue;
      Venue.findOne({name: venueName}, function(err, venue) {
        if (err) {
          return res.status(500).json({msg: err});
        }
        if (venue) {
          res.json(venue);
        } else {
          res.status(404).json({msg: 'Unable to locate ' + venueName});
        }
      });
    })
    .post(function(req, res) {
      var venueName = req.params.venue;
      var venueInfo = req.body;
      Venue.update({name: venueName}, venueInfo, function(err, venue) {
        if (err) {
          return res.status(500).json({msg: err});
        }
        if (venue) {
          res.json(venue);
        } else {
          res.status(404).json({msg: 'Unable to locate '} + venueName);
        }
      });
    })
    .put(function(req, res) {
      var venueName = req.params.venue;
      var newVenueInfo = req.body;

      Venue.update({name: venueName}, newVenueInfo, function(err, venue) {
        if (err) {
          return res.status(500).json({msg: err});
        }
        if (venue) {
          res.json(venue);
        } else {
          res.status(404).json({msg: 'Unable to locate ' + venueName});
        }
      });
    })
    .delete(function(req, res) {
      var venueName = req.params.venue;
      Venue.findOne({name: venueName}, function(err, venue) {
        if (err) {
          return res.status(500).json({msg: err});
        }
        if (venue) {
          venue.remove();
          res.json({msg: venueName + ' was deleted'});
        } else {
          res.status(404).json({msg: 'Unable to locate ' + venueName});
        }
      })
    })
};