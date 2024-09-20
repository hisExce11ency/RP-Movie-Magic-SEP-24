import express from "express";

const app = express();

app.get('/', (req,res)=>{
    res.send('Just works');
});

app.listen(5055, () => console.log('Server is listening on http://localhost:5055...'));