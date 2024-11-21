import { MigrationInterface, QueryRunner } from "typeorm";

export class Newmigrations1732025310474 implements MigrationInterface {
    name = 'Newmigrations1732025310474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" date, "deleted_by" character varying, "source_currency" character varying NOT NULL, "destination_currency" character varying NOT NULL, "sell_price" character varying NOT NULL, "buy_price" character varying NOT NULL, "cap_amount" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_2c804ed4019b80ce48eedba5cec" UNIQUE ("id"), CONSTRAINT "PK_2c804ed4019b80ce48eedba5cec" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "rates"`);
    }

}
