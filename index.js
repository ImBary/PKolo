const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/testDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Could not connect to MongoDB', err);
});



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Item = require('./models/item');
const User = require('./models/users');

app.get('/api/users/:id',async(req,res)=>{
    const { id }  = req.params;
    console.log(id);
    const user3 = await User.find({id:id},{_id:0,first_name:1})
    const user = await User.findById('665f467f5b5fb4457b07318b');
    const user2 = await User.findOne({id:id})
    res.json(user2);
    
})

app.post('/api/users',async(req,res)=>{
    const { first_name , last_name } = req.body;
    console.log("xxxx"+first_name);
    const user = new User({
        first_name: first_name,
        last_name: last_name,
    })
    await user.save()
    res.redirect('/')
});

app.delete('/api/users/:id',async(req,res)=>{
    const { id } = req.params
    const respon = await User.findOneAndDelete({ id: id });
    res.json(respon);
});

app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.render('index', { items });
});

app.get('/api/users', async (req, res) => {
    const users = await User.find();
    //console.log(JSON.stringify(users))
    res.render('users', { users });
});
app.post('/items', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        quantity: req.body.quantity
    });
    await item.save();
    res.redirect('/items');
});

app.get('/', (req, res) => {
    res.redirect('/api/users');
});

app.post('/items/update/:id', async (req, res) => {
    const { id } = req.params;
    await Item.findByIdAndUpdate(id, { name: req.body.name, quantity: req.body.quantity });
    res.redirect('/items');
});

app.post('/items/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Item.findByIdAndRemove(id);
    res.redirect('/items');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
