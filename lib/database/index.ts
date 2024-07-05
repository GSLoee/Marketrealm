import mongoose from 'mongoose';

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

const MONGODB_URI = process.env.MONGODB_URI as string;

let isConnected = false;

const checkConnectionStatus = () => {
    const status = mongoose.connection.readyState;
    switch (status) {
        case 0:
            return 'Disconnected';
        case 1:
            return 'Connected';
        case 2:
            return 'Connecting';
        case 3:
            return 'Disconnecting';
        default:
            return 'Unknown';
    }
};

export const connectToDatabase = async () => {
    console.log('Starting database connection process...');
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    if (!MONGODB_URI) {
        console.error('MONGODB_URI environment variable is missing');
        throw new Error('MONGODB_URI environment variable is missing');
    }

    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(MONGODB_URI, {
            dbName: 'Marketrealm',
            bufferCommands: false,
        });
        isConnected = true;

        console.log('MongoDB is connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }

    // Log the connection status
    const status = checkConnectionStatus();
    console.log(`Connection status: ${status}`);
};

// Call the function to test it
connectToDatabase().then(() => {
    console.log('Database connection function executed');
}).catch((error) => {
    console.error('Error executing database connection function:', error);
});