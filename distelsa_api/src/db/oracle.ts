import { Sequelize } from 'sequelize';
import { secretsManager } from '../config/secrets';
import Student from '../services/student/models/student.model';

class OracleConnection {
    private static instance: Sequelize;

    private constructor() {}

    public static getInstance(): Sequelize {
        if (!OracleConnection.instance) {
            const host = secretsManager.getSecret('ORACLE_DB_HOST');
            const user = secretsManager.getSecret('ORACLE_DB_USER');
            const pass = secretsManager.getSecret('ORACLE_DB_PASSWORD');
            const dbname = secretsManager.getSecret('ORACLE_DB_NAME');

            OracleConnection.instance = new Sequelize(dbname, user, pass, {
                host: host,
                dialect: 'oracle', // Asegúrate de que este dialecto esté soportado
                logging: false,
            });

            // Test the connection
            OracleConnection.instance.authenticate()
                .then(() => {
                    console.log('Oracle DB connected');
                })
                .catch(err => {
                    console.error('Unable to connect to the Oracle DB:', err);
                });
        }
        return OracleConnection.instance;
    }

    public static async closeConnection(): Promise<void> {
        if (OracleConnection.instance) {
            try {
                await OracleConnection.instance.close();
                console.log('Oracle DB connection closed');
            } catch (err) {
                console.error('Error closing the Oracle DB connection:', err);
                throw err;
            }
        }
    }
}

export default OracleConnection;


async function testQuery() {
    try {
        const students = await Student.findAll();
        console.log('Students:', students);
    } catch (error) {
        console.error('Error retrieving students:', error);
    } finally {
        await OracleConnection.closeConnection();
    }
}