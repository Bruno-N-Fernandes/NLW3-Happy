import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImage1603001410815 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createTable(new Table({
            name: "Image",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                    isNullable: false
                },
                {
                    name: "path",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "orphanageId",
                    type: "integer",
                    isNullable: false
                }
            ],
            foreignKeys: [
                {
                    name: 'ImageOrphanage',
                    columnNames: ['OrphanageId'],
                    referencedTableName: 'orphanage',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable("Image");
    }
}
