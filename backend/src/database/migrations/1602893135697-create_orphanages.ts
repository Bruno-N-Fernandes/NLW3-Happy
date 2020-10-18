import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrphanage1602893135697 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		return await queryRunner.createTable(new Table({
			name: "Orphanage",
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
					name: "name",
					type: "varchar",
					isNullable: false
				},
				{
					name: "latitude",
					type: "decimal",
					scale: 10,
					precision: 2,
					isNullable: false
				},
				{
					name: "longitude",
					type: "decimal",
					scale: 10,
					precision: 2,
					isNullable: false
				},
				{
					name: "about",
					type: "text",
					isNullable: false
				},
				{
					name: "instructions",
					type: "text",
					isNullable: false
				},
				{
					name: "opening_hours",
					type: "varchar",
					isNullable: false
				},
				{
					name: "open_on_weekends",
					type: "boolean",
					isNullable: false,
					default: false
				},
			],
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		return await queryRunner.dropTable("Orphanage");
	}
}