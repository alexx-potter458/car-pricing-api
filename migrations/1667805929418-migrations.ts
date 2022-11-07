import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1667805929418 implements MigrationInterface {
    name = 'migrations1667805929418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "year" integer NOT NULL, "kmage" integer NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "userId" integer, CONSTRAINT "FK_e347c56b008c2057c9887e230aa" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_report"("id", "price", "make", "model", "lng", "lat", "year", "kmage", "approved", "userId") SELECT "id", "price", "make", "model", "lng", "lat", "year", "mileage", "approved", "userId" FROM "report"`);
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`ALTER TABLE "temporary_report" RENAME TO "report"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" RENAME TO "temporary_report"`);
        await queryRunner.query(`CREATE TABLE "report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "year" integer NOT NULL, "mileage" integer NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "userId" integer, CONSTRAINT "FK_e347c56b008c2057c9887e230aa" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "report"("id", "price", "make", "model", "lng", "lat", "year", "mileage", "approved", "userId") SELECT "id", "price", "make", "model", "lng", "lat", "year", "kmage", "approved", "userId" FROM "temporary_report"`);
        await queryRunner.query(`DROP TABLE "temporary_report"`);
    }

}
