import { DataSource } from "typeorm";
import database from '../../config/database';

export default new DataSource({
    ...database(),
});