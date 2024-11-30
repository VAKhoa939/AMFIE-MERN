require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser'); 

const assetRoutes = require('./routes/assetRoute');
const userRoutes = require('./routes/userRoute');
const addressRoutes = require('./routes/addressRoute');
const authRoutes = require('./routes/authRoute'); 
const importRouter = require('./routes/importDB.Route');
const exportRouter = require('./routes/exportDB.Route');

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
const corsOptions = { origin: process.env.CORS_ORIGIN || 'http://localhost:5173', credentials: true };


app.use(cors(corsOptions)); 
app.use(cookieParser()); 

app.use('/api/asset', assetRoutes); 
app.use('/api/user', userRoutes); 
app.use('/api/addresses', addressRoutes); 
app.use('/api/import', importRouter);
app.use('/api/export', exportRouter);
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
