import mongoose from 'mongoose';
import { secretsManager } from '../config/secrets';

class MongoConnection {
    private static instance: mongoose.Connection;

    private constructor() { }

    public static async getInstance(): Promise<mongoose.Connection> {
        if (!MongoConnection.instance) {
            const host = secretsManager.getSecret('MONGO_DB_HOST');
            // const user = secretsManager.getSecret('MONGO_DB_USER');
            // const pass = secretsManager.getSecret('MONGO_DB_PASSWORD');
            const dbname = secretsManager.getSecret('MONGO_DB_NAME');
            await mongoose.connect(`mongodb://${host}/${dbname}`);
            MongoConnection.instance = mongoose.connection;
            MongoConnection.instance.on('error', console.error.bind(console, 'MongoDB connection error:'));
        }
        return MongoConnection.instance;
    }
}

export default MongoConnection;