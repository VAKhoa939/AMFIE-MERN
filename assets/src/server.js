require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const assetRoutes = require('./routes/Assets.Routes');
const userRoutes = require('./routes/User.Routes');
const addressRoutes = require('./routes/Address.Routes');
const authRoutes = require('./routes/auth.Routes'); 
const { checkAdmin, checkUser } = require('./middleware/auth.Middleware'); 

app.use(express.json());

const dbURI = process.env.MONGODB_URI;
if (!dbURI) {
    console.error('MongoDB connection string is not defined.');
    process.exit(1); 
}

mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('Error connecting to MongoDB:', err);
        process.exit(1);  
    });

    app.use(cors())
app.use('/api', assetRoutes); 
app.use('/api', userRoutes); 
app.use('/api', addressRoutes); 

app.use('/api/auth', authRoutes);

app.get('/api/admin', checkAdmin, (req, res) => {
    res.json({ message: 'Chào admin!' });
});

app.get('/api/user', checkUser, (req, res) => {
    res.json({ message: `Chào ${req.user.userId}, bạn đã đăng nhập thành công!` });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
