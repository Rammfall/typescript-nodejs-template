import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class appUser1598791352114 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'app_user',
        columns: [
          {
            name: 'id',
            type: 'bigserial',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'username',
            type: 'varchar',
            length: '30',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '320',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'text',
            isNullable: false,
          },
        ],
      })
    );
    await queryRunner.createTable(
      new Table({
        name: 'user_profile',
        columns: [
          {
            name: 'userId',
            type: 'bigserial',
            isPrimary: true,
            isNullable: false,
            isUnique: true,
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
            isNullable: true,
          },
          {
            name: 'location',
            type: 'varchar',
            length: '70',
            isNullable: true,
          },
          {
            name: 'photo',
            type: 'text',
            isNullable: true,
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

  // eslint-disable-next-line class-methods-use-this
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_profile', true, true);
    await queryRunner.dropTable('app_user', true, true);
  }
}
