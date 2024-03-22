import {
    MigrationInterface,
    QueryRunner,
    Table,
} from "typeorm"

export class CreateUserTable1711104239184 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                { name: 'id', type: 'bigint', unsigned: true, isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'username', type: 'varchar', length: '64', isUnique: true, isNullable: false },
                { name: 'email', type: 'varchar', length: '64', isUnique: true, isNullable: false },
                { name: 'password', type: 'varchar', length: '255', isNullable: false },
                { name: 'photo_url', type: 'varchar', length: '255', isNullable: true },
                { name: 'last_login_at', type: 'timestamp', default: 'now()', isNullable: true },
                { name: 'created_at', type: 'timestamp', default: 'now()', isNullable: false },
                { name: 'updated_at', type: 'timestamp', default: 'now() ON UPDATE now()', isNullable: true },
                { name: 'deleted_at', type: 'timestamp', isNullable: true }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}
