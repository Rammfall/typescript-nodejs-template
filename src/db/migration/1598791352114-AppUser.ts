import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AppUser1598791352114 implements MigrationInterface {
  // eslint-disable-next-line class-methods-use-this
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
            generationStrategy: 'increment',
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
  }

  // eslint-disable-next-line class-methods-use-this
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('AppUser');
  }
}
