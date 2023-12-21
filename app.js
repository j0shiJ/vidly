const express = require('express');
const app =express();
// methods
//get put post delete
//get
app.get('/',(req,res) => {
    res.send("hello world!!!!");
});
app.get('/courses')

app.listen(3000,'localhost',()=>{console.log("listening")});