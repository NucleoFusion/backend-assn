import express from 'express';
import { default as mongodb } from 'mongodb';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//MongoDB connection
let MongoClient = mongodb.MongoClient;
const client = new MongoClient('mongodb://localhost:27017');
const db = client.db('productTest');
const products = db.collection('products')

app.post('/api/product', (req,res)=>{
    const product_name = req.body.product_name;
    const product_code = req.body.product_code;
    products.insertOne({
        product_name: product_name,
        product_code: product_code
    });
    res.json({
        product_name: product_name,
        product_code: product_code
    })
});

app.get('/api/product/:id', async (req,res)=>{
    const prod = await products.findOne({product_code: req.params.id});
    res.json(prod);
});


app.listen(3000, ()=>{
    console.log('Listening at port 3000');
});