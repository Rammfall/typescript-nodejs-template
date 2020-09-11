import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class user2fa1599768796757 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_2fa',
        columns: [
          {
            name: 'userId',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'status',
            type: 'bool',
            default: false,
            isNullable: false,
          },
          {
            name: 'secretKey',
            type: 'text',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'user_2fa',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'app_user',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_2fa');
  }
}
