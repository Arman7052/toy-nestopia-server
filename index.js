const express = require('express')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// MiddleWare //
app.use(cors());
app.use(express.json());







app.get('/', (req,res) => {
    res.send('ToyNastopia start playing...')
})



app.listen(port,() => {
    console.log(`ToyNastopia is running in port :${port}`);
})