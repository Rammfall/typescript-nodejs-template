import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class userProfile1599396105958 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_profile',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'firstName',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          {
            name: 'lastName',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          {
            name: 'about',
            type: 'text',
          },
          {
            name: 'location',
            type: 'varchar',
            length: '70',
          },
          {
            name: 'photo',
            type: 'text',
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
      'user_profile',
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
    await queryRunner.dropTable('user_profile');
  }
}
