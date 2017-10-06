const express = require('express');
const path = require('path');
const config = require('./config');
const base50 = require('./helpers.js');
const url = require('./models');

const router = express.Router();

// GET /
// Get the route for the homepage
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});


router.get('/new/*', (req, res, next) => {
  const longUrl = req.params[0];
  let shortUrl = '';

  // check if url already exists in database
  url.findOne({long_url: longUrl}, (err, doc) => {
    if (doc) {
      shortUrl = config.webhost + base50.encode(doc._id);
      // the document exists, so we return it without creating a new entry
      res.json({
        long_url: longUrl,
        short_url: shortUrl
      });
    } else {
      // since it doesn't exist, let's go ahead and create it:
      const newUrl = url({
        long_url: longUrl
      });

      // save the new link
      newUrl.save((err) => {
        if (err){
          console.log(err);
        }
        shortUrl = config.webhost + base50.encode(newUrl._id);
        res.json({
          long_url: longUrl,
          short_url: shortUrl
        });
      });
    }

  });
});

router.get('/:encoded_id', (req, res, next) => {
  const base50Id = req.params.encoded_id;
  const id = base50.decode(base50Id);

  // check if url already exists in database
  url.findOne({ _id: id }, (err, doc) => {
    (doc) ? res.redirect(doc.long_url) : res.redirect(config.webhost);
  });
});

module.exports = router;