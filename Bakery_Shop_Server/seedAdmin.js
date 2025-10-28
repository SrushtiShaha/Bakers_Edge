const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin'); // path to your Admin model

dotenv.config(); // Load .env file

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await Admin.create({
      email: 'admin@bakery.com',
      password: hashedPassword,
    });

    console.log('✅ Admin created');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
