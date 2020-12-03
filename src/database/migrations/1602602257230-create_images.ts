import {MigrationInterface} from "typeorm";
import {QueryRunner} from "typeorm";
import {Table} from "typeorm";

export class createImages1602602257230 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'images',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'path',
            type: 'varchar',
          },
          {
            name: 'exhibition_id',
            type: 'integer',
          },
        ],
        foreignKeys: [
          {
            name: 'ImageExhibition',
            columnNames: ['exhibition_id'],
            referencedTableName: 'exhibitions',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }
}
