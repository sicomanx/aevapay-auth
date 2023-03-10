import { MigrationInterface, QueryRunner } from "typeorm"

export class AddPhoneAndCountryCodeToUserEntity1673034653910 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user_entity" ADD COLUMN IF NOT EXISTS "country_code" VARCHAR(10), ADD COLUMN IF NOT EXISTS "phone_number" VARCHAR`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user_entity" DROP COLUMN IF EXISTS "country_code", DROP COLUMN IF EXISTS "phone_number"`,
        )
    }

}
