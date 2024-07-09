import { Document, Schema, model, models } from "mongoose";

export interface IProduct extends Document {
    _id: string;
    title: string;
    description?: string;
    imageURL: string;
    price: string;
    category:{_id: string, name: string}
    seller: {_id: string, username: string};
}

const ProductSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    imageURL: {type: String, required: true},
    price: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    seller: {type: Schema.Types.ObjectId, ref: 'User'}
})

const Event = models.Event || model('Event', ProductSchema)

export default Event;