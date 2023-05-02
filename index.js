const express = require('express');
const app = express();
 // import the schema we created in step 2
const User = require('./models/userSchema');

const { router, logRequests } = require('./routes/userRoutes');

app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.use(logRequests);
app.use("/users",router);


// Use user routes

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));



  
const port = process.env.PORT || 8003;
app.listen(port, () => console.log(`Listening on port ${port}...`));
