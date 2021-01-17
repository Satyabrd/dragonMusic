const express = require('express');
const connectDB = require('./config/db')
const app = express();
var cors = require('cors');

//connect database
connectDB();
//use cors
app.use(cors());
// Init Middleware
app.use(express.json({extended: false}));
app.get('/',(req,res) => res.send('API Running'));

//Define Routes
app.use('/api/playlists',require('./routes/api/playlists'));


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server Started on port ${PORT}`);
})