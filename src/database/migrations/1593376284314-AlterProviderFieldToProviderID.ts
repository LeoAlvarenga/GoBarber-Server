import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";
import { QueryExpressionMap } from "typeorm/query-builder/QueryExpressionMap";

export default class AlterProviderFieldToProviderID1593376284314
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "id")
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()",
      })
    )
    
    await queryRunner.dropColumn("appointments", "id")
    await queryRunner.addColumn(
      "appointments",
      new TableColumn({
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()",
      })
    )

    await queryRunner.dropColumn("appointments", "provider");
    await queryRunner.addColumn(
      "appointments",
      new TableColumn({
        name: "provider_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "appointments",
      new TableForeignKey({
        name: "AppointmentProvider",
        columnNames: ["provider_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("appointments", "AppointmentProvider");

    await queryRunner.dropColumn("appointments", "provider_id");

    await queryRunner.addColumn(
      "appointments",
      new TableColumn({
        name: "provider",
        type: "varchar",
        isNullable: false,
      })
    );

    await queryRunner.dropColumn("appointments", "id")
    await queryRunner.addColumn(
      "appointments",
      new TableColumn({
        name: "id",
        type: "varchar",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()",
      })
    )

    await queryRunner.dropColumn("users", "id")
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "id",
        type: "varchar",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()",
      })
    )

  }
}
