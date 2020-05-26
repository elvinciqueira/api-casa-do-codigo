import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateBooks1590451109819 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'books',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'category_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'author_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'summary',
            type: 'varchar',
          },
          {
            name: 'contents',
            type: 'varchar',
          },
          {
            name: 'isbn',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'pages',
            type: 'int',
          },
          {
            name: 'date_publication',
            type: 'date',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('books', [
      new TableForeignKey({
        columnNames: ['author_id'],
        referencedTableName: 'authors',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('books');
  }
}
