const mongoose = require('mongoose');
const Medicine = require('../models/medicine');

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
const arr = [
    {
        title: 'PATANJALI TULSI GHANVATI 40 GM',
        price: 110,
        image: 'https://images.unsplash.com/photo-1625036811424-26f4dc5a5dde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80',
        description: 'Patanjali Divya Tulsi Ghan Vati is very beneficial for the health and immunity of the body. This is helpful in fever, dengue, cold, and chicken guinea.',
    },
    {
        title: 'DIVYA LIPIDOM TABLET 60 N 41 GM',
        price: 300,
        image: 'https://images.unsplash.com/photo-1625036811424-26f4dc5a5dde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80',
        description: 'Divya lipidom tablet is useful for reduce the actual cololstrol, dyslipidemia, helpful in fat metabolism',
    },
    {
        title: 'DIVYA CORONIL TABLET 54 GM',
        price: 400,
        image: 'https://www.netmeds.com/images/product-v1/600x600/802926/patanjali_juice_amla_1_ltr_0.jpg',
        description: 'Divya Coronil Tablet 80 Tab Covid-19 Immunity Booster Tablet.',
    },
    {
        title: 'AMLA-ALOEVERA WITH WHEATGRASS JUICE 500 ML',
        price: 100,
        image: 'https://www.netmeds.com/images/product-v1/600x600/802926/patanjali_juice_amla_1_ltr_0.jpg',
        description: 'Amla Aloe Vera wheatgrass juice helps to improve natural immune system. It improves digestion and useful for better heart health. It also helps in weight loss.',
    },
]
const seedDB = async () => {
    await Medicine.deleteMany({});
    for (let i = 0; i < arr.length; i++) {

        const med = new Medicine({
            description: arr[i].description,
            title: arr[i].title,
            price: arr[i].price,
            image: arr[i].image
        })
        await med.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

