import mongoose, { Mongoose } from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI as string;

// let cached = (global as any).mongoose || { conn: null, promise: null };

// export const connectToDatabase = async () => {
//   if (cached.conn) return cached.conn;

//   if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

//   cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
//     dbName: 'Marketrealm',
//     bufferCommands: false,
//   })

//   cached.conn = await cached.promise;

//   return cached.conn;
// }

const MONGODB_URI = process.env.MONGODB_URI!;

interface MongooseConn{
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConn = (global as any).mongoose;

if(!cached){
    cached = (global as any).mongoose = {
        conn: null,
        promise: null
    }
}

export const connectToDatabase = async () => {
    if(cached.conn) return cached.conn

    cached.promise = cached.promise ||
    mongoose.connect(MONGODB_URI, {
        dbName: 'Marketrealm-project',
        bufferCommands: false, 
        connectTimeoutMS: 30000
    })

    cached.conn = await cached.promise;
    return cached.conn; 
}
