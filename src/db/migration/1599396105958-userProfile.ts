import { MigrationInterface, QueryRunner } from 'typeorm';

export class userProfile1599396105958 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
