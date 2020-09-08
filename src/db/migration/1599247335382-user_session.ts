import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class userSession1599247335382 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_session',
        columns: [
          {
            name: 'refreshToken',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'accessToken',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'device',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          {
            name: 'expiredDate',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'bigint',
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'user_session',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'app_user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_session');
  }
}
