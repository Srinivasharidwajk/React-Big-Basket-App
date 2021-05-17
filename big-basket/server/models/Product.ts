import mongoose , {Schema, Model} from 'mongoose';
import {IProduct} from "./IProduct";

const productSchema:Schema = new mongoose.Schema({
    name : {type : String , required : true, unique : true},
    image : {type : String , required : true},
    price : {type : Number , required : true},
    qty : {type : Number , required : true},
    info : {type : String , required : true},
}, {timestamps : true});

const ProductTable:Model<IProduct> = mongoose.model('product', productSchema);
export default ProductTable;