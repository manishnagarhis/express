const router = require('express').Router();
const ErrorHandler = require('../errors/ErrorHandler');
let products = require('../productData');
const apiKryMiddleware = require('../middlewares/apiKey')

router.get('/products',(req,res)=>{
    res.render('products',{
        title:"Product page"
    });
})

router.get('/api/products',(req,res)=>{
    res.json({products})
})

router.post('/api/products',apiKryMiddleware,(req,res,next)=>{
    const {name,price} = req.body;
    if(!name || !price){
        next(ErrorHandler.validationError());
        // throw new Error('All fields are required.');
        //return res.status(422).json({ error:'All fields are required.'});
    }
    const product = {
        name,
        price,
        id : new Date().getTime().toString()
    }
    products.push(product);

    res.json(product);
})

router.delete('/api/products/:productId',(req,res)=>{
    products = products.filter((product) => req.params.productId !== product.id)
    res.json({statys:'OK'});
})

module.exports = router;