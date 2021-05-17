import {Document} from 'mongoose';

export interface IProduct extends Document{
    _id? : string;
    name : string;
    image : string;
    price : number;
    qty : number;
    info : string;
    createdAt? : string;
    updatedAt? : string;
}