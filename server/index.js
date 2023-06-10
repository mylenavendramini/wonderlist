const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');
const userRouter = require('./routes/user');
const travelRouter = require('./routes/travel');
const categoriesRouter = require('./routes/categories');
const activitiesRouter = require('./routes/activities');

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
}
app.use(cors(corsConfig));
app.use(express.json());
app.use(userRouter);
app.use(travelRouter);
app.use(categoriesRouter);
app.use(activitiesRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}.`)
})