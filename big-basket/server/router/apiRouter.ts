import express from 'express';
import {IProduct} from "../models/IProduct";
const apiRouter:express.Router = express.Router();
import ProductTable from "../models/Product";

// logic
/*
   @usage : GET All Products
   @url : http://127.0.0.1:5000/api/products
   @method : GET
   @fields : no-fields
   @access : PUBLIC
 */
apiRouter.get('/products', async (request:express.Request , response:express.Response) => {
    try {
        let products:IProduct[] = await ProductTable.find();
        response.status(200).json({
            msg : 'Found Products',
            products : products
        });
    }
    catch (error) {
        console.error(error);
        response.status(500).json({
            errors : [
                { msg : error}
            ]
        });
    }
});

/*
   @usage : GET single Product
   @url : http://127.0.0.1:5000/api/products/:productId
   @method : GET
   @fields : no-fields
   @access : PUBLIC
 */
apiRouter.get('/products/:productId', async (request:express.Request , response:express.Response) => {
    let productId : string = request.params.productId;
    try {
        let product:IProduct|null = await ProductTable.findById(productId);
        if(product){
            response.status(200).json({
                msg : 'Product Found',
                product : product
            });
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).json({
            errors : [
                { msg : error}
            ]
        });
    }
});

/*
   @usage : CREATE a Product
   @url : http://127.0.0.1:5000/api/products/
   @method : POST
   @fields : name , image , price , qty , info
   @access : PUBLIC
 */
apiRouter.post('/products', async (request:express.Request , response:express.Response) => {
   try {
       let {name , image , price , qty , info} = request.body;
        // check if product exists
        let product:IProduct | null = await ProductTable.findOne({name : name});
        if(product){
            return response.status(401).json({
                errors : [
                    { msg : 'Product is Already Exists'}
                ]
            });
        }
        // save to database
       product = new ProductTable({name , image, price , qty , info});
       product = await product.save();
       response.status(200).json({
           msg : 'Product is Created Successfully'
       });
   }
   catch(error) {
       console.error(error);
       response.status(500).json({
           errors : [
               { msg : error}
           ]
       });
   }
});

/*
   @usage : UPDATE a Product
   @url : http://127.0.0.1:5000/api/products/:productId
   @method : PUT
   @fields : name , image , price , qty , info
   @access : PUBLIC
 */
apiRouter.put('/products/:productId', async (request:express.Request , response:express.Response) => {
    let productId : string = request.params.productId;
    try {
        let {name , image, price , qty , info} = request.body;

        // check if the product is exists
        let product:IProduct | null = await ProductTable.findById(productId);
        if(!product){
            return response.status(401).json({
                errors : [
                    { msg : 'Product not Available'}
                ]
            });
        }
        // update the product
        product = await ProductTable.findByIdAndUpdate(productId, {
            $set : {_id : productId, name , image , price , qty , info}
        },{new : true});
        response.status(200).json({
            msg : 'Product is Updated Successfully'
        });
    }
    catch (error) {
        console.error(error);
        response.status(500).json({
            errors : [
                { msg : error}
            ]
        });
    }
});


/*
   @usage : DELETE a Product
   @url : http://127.0.0.1:5000/api/products/:productId
   @method : DELETE
   @fields : no-fields
   @access : PUBLIC
 */
apiRouter.delete('/products/:productId', async (request:express.Request , response:express.Response) => {
    let productId : string = request.params.productId;
    try {
        // check if the product is exists
        let product:IProduct | null = await ProductTable.findById(productId);
        if(!product){
            return response.status(401).json({
                errors : [
                    { msg : 'Product not Available'}
                ]
            });
        }
        // delete the product
        product = await ProductTable.findByIdAndDelete(productId);
        response.status(200).json({
            msg : 'Product is Deleted',
            productID : product?._id
        });
    }
    catch (error) {
        console.error(error);
        response.status(500).json({
            errors : [
                { msg : error}
            ]
        });
    }
});



export default apiRouter;