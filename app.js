const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like

const googleApps = require('./google-apps.js');

app.get('/apps', (req, res) => {
    const { search = "", sort } = req.query;
  
    if (sort) {
      if (!['rating', 'app'].includes(sort)) {
        return res
          .status(400)
          .send('Sort must be one of rating or app');
      }
    }
  
    let results = googleApps
          .filter(app =>
              app
                .App
                // .rating
                // .toLowerCase()
                 .includes(search));
  
    if (sort) {
      results
        .sort((a, b) => {
          return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
    }
  
    res
      .json(results);
  });

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});