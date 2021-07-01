const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Medicine = require('./models/medicine');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
mongoose.connect('mongodb://localhost:27017/pharmEasyClone', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.get('/', (req, res) => {
    res.render('home');
})
app.get('/medicines', async (req, res) => {
    const medicines = await Medicine.find({});
    res.render('medicines/index', { medicines })
});
app.get('/medicines/new', (req, res) => {
    res.render('medicines/new');
})
app.post('/medicines', async (req, res) => {
    //res.send(req.body.medicine);
    const medicine = new Medicine(req.body.medicine);
    await medicine.save();
    res.redirect(`/medicines/${medicine._id}`)
})
app.get('/medicines/:id', async (req, res,) => {
    const medicine = await Medicine.findById(req.params.id);
    //res.render('medicines/show');
    res.render('medicines/show', { medicine });
});
app.get('/medicines/:id/edit', async (req, res) => {
    const medicine = await Medicine.findById(req.params.id)
    res.render('medicines/edit', { medicine });
})
app.put('/medicines/:id', async (req, res) => {
    const { id } = req.params;
    const medicine = await Medicine.findByIdAndUpdate(id, { ...req.body.medicine });
    res.redirect(`/medicines/${medicine._id}`)
});
app.delete('/medicines/:id', async (req, res) => {
    const { id } = req.params;
    await Medicine.findByIdAndDelete(id);
    res.redirect('/medicines');
})
app.listen(3000, () => {
    console.log("serving on port 3000");
})