import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });
interface DatabaseConfig {
    type: 'mysql';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: string[];
    migrations: string[];
    synchronize: boolean;
}

export default (): DatabaseConfig => {
    return {
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'blog_app_be_db',
        entities: ['dist/src/**/entities/*.entity.{js,ts}'],
        migrations: ['dist/src/database/migrations/*{.ts,.js}'],
        synchronize: true // Note: Set to true for development, consider false for production
    };
};