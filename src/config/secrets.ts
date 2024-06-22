import * as dotenv from 'dotenv';

dotenv.config();

class SecretsManager {
    private secrets: Map<string, string> = new Map();
    constructor() {
        // secretos mongo
        this.secrets.set('MONGO_DB_HOST', process.env.MONGO_DB_HOST!);
        this.secrets.set('MONGO_DB_USER', process.env.MONGO_DB_USER!);
        this.secrets.set('MONGO_DB_PASSWORD', process.env.MONGO_DB_PASSWORD!);
        this.secrets.set('MONGO_DB_NAME', process.env.MONGO_DB_NAME!);
        // secretos oracle
        this.secrets.set('ORACLE_DB_HOST', process.env.ORACLE_DB_HOST!);
        this.secrets.set('ORACLE_DB_USER', process.env.ORACLE_DB_USER!);
        this.secrets.set('ORACLE_DB_PASSWORD', process.env.ORACLE_DB_PASSWORD!);
        this.secrets.set('ORACLE_DB_NAME', process.env.ORACLE_DB_NAME!);
    }
    getSecret(key: string): string {
        if (!this.secrets.has(key)) {
            throw new Error(`Secret not found: ${key}`);
        }
        return this.secrets.get(key)!;
    }
}

export const secretsManager = new SecretsManager();
