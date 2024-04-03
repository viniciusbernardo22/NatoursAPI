const express = require('express');
const fs = require('fs');

const toursJson = `${__dirname}/dev-data/data/tours.json`;

const app = express();

app.use(express.json());

const port = 3000;

const tours = JSON.parse(fs.readFileSync(toursJson));

app.get('/api/v1/tours', (req, res) => {
  res.status(200).send({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(toursJson, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour,
      },
    });
  });
});



app.listen(port, () => {
  console.log('Listening');
});
