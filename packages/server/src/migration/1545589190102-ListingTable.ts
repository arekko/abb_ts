import {MigrationInterface, QueryRunner} from "typeorm";

export class ListingTable1545589190102 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "listing" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "pictureUrl" text NOT NULL, "description" character varying(255) NOT NULL, "price" integer NOT NULL, "beds" integer NOT NULL, "guests" integer NOT NULL, "latitude" double precision NOT NULL, "longtitude" double precision NOT NULL, "amenities" text array NOT NULL, "userId" integer, CONSTRAINT "PK_381d45ebb8692362c156d6b87d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "listing" ADD CONSTRAINT "FK_33bd8a3b7eeccb95ae45038d956" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "listing" DROP CONSTRAINT "FK_33bd8a3b7eeccb95ae45038d956"`);
        await queryRunner.query(`DROP TABLE "listing"`);
    }

}
