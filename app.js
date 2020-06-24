require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const port = process.env.PORT || 3000
const server = http.createServer(app);
const cors = require('cors');
const User = require('./User');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
}).then(function(){
    console.log('Connected to MongoDB');
})

server.listen(port, '0.0.0.0',function(){
    console.log('listening on port: ' + port);
})

app.use(cors());

app.get('/', async function(req,res){
    var userList = await User.find();
    res.send(userList);
})

app.get('/:id', async function(req,res){
    var id = req.params.id;
    var user = await User.findOne({
        _id : id
    })
    if(!user){
        return res.status(400).send('error');
    }
    res.send(user);
})

app.post('/',function(req,res){
    var name = req.body.name;
    var dob = req.body.dob;
    var age = req.body.age;
    var user = new User({
        name : name,
        dob : dob,
        age : age
    })
    user.save().then((user) => {
        console.log(user);
    })
    res.status(200).send('OK');
})

app.put('/:id', async function(req,res){
    var name = req.body.name;
    var dob = req.body.dob;
    var age = req.body.age;
    var id = req.params.id;
    await User.updateOne({_id : id},{
        name : name,
        dob: dob,
        age : age
    })  
    res.status(200).send('OK');
})

app.delete('/:id',async function(req,res){
    var id = req.params.id;
    await User.deleteOne({_id : id});
    res.status(200).send('OK');
})



