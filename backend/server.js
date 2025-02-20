const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/product.routes');
const exportRoutes = require('./routes/export.routes');

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/products', productRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/transactions', require('./routes/transaction.routes'));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

mongoose.connection.once('open', async () => {
  try {
    await mongoose.connection.collection('users');
    console.log('Dropped userName index');
  } catch (error) {
    // Index might not exist, which is fine
    console.log('No userName index to drop');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 