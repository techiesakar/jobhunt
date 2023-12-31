import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1701852748390 implements MigrationInterface {
    name = 'Migrate1701852748390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "location" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "technology" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_89f217a9ebf9b4bc1a0d74883ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "benefit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c024dccb30e6f4702adffe884d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "desc" character varying, "image" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "company_name" character varying NOT NULL, "company_code" character varying NOT NULL DEFAULT 'not-available', "ceo_name" character varying, "agent_name" character varying, "company_phone" character varying NOT NULL, "company_email" character varying NOT NULL, "total_employee" integer, "date_founded" TIMESTAMP, "description" character varying, "social_links" jsonb DEFAULT '[]', "image" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_13b38a9d511c0277d156d0b83b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "job_phone" character varying NOT NULL, "job_email" character varying NOT NULL, "job_role" character varying NOT NULL DEFAULT '', "job_salary" character varying NOT NULL, "job_desc" character varying NOT NULL, "who_to_apply" character varying NOT NULL DEFAULT '', "vacancy_deadline" character varying NOT NULL, "job_image" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" uuid, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "company_code" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'jobseeker', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location_companies_company" ("locationId" uuid NOT NULL, "companyId" uuid NOT NULL, CONSTRAINT "PK_4c92ad6b1995008b27297924153" PRIMARY KEY ("locationId", "companyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c87c761a1b97eed39a809e8d07" ON "location_companies_company" ("locationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ab9fad7baf8cf0629bdb8fde6a" ON "location_companies_company" ("companyId") `);
        await queryRunner.query(`CREATE TABLE "location_jobs_job" ("locationId" uuid NOT NULL, "jobId" uuid NOT NULL, CONSTRAINT "PK_465cd0054bd67196ad04810a7b0" PRIMARY KEY ("locationId", "jobId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_859e82fabf6dddfccbaa4b3fcf" ON "location_jobs_job" ("locationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c763dfbd98b28b256803876cf1" ON "location_jobs_job" ("jobId") `);
        await queryRunner.query(`CREATE TABLE "technology_companies_company" ("technologyId" uuid NOT NULL, "companyId" uuid NOT NULL, CONSTRAINT "PK_16cb73acfd23f9101a8ce1712a0" PRIMARY KEY ("technologyId", "companyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_778320b324cd0736d75d66a79a" ON "technology_companies_company" ("technologyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_798ca3c1d63b9d1ebfaf4ad435" ON "technology_companies_company" ("companyId") `);
        await queryRunner.query(`CREATE TABLE "technology_jobs_job" ("technologyId" uuid NOT NULL, "jobId" uuid NOT NULL, CONSTRAINT "PK_f05c7db00a0a5bb7c129789e0e0" PRIMARY KEY ("technologyId", "jobId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0c4b6c2b26d7755a2a2189cb9d" ON "technology_jobs_job" ("technologyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a4d82e86bed0665f467c3edd7e" ON "technology_jobs_job" ("jobId") `);
        await queryRunner.query(`CREATE TABLE "benefit_companies_company" ("benefitId" uuid NOT NULL, "companyId" uuid NOT NULL, CONSTRAINT "PK_f650d68cd328b563171791e73ec" PRIMARY KEY ("benefitId", "companyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8938fb7736a2fd2e87b9683cb6" ON "benefit_companies_company" ("benefitId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6c9c015144b4f873db4dd73774" ON "benefit_companies_company" ("companyId") `);
        await queryRunner.query(`CREATE TABLE "benefit_jobs_job" ("benefitId" uuid NOT NULL, "jobId" uuid NOT NULL, CONSTRAINT "PK_bea2a765988893ebda94c68541d" PRIMARY KEY ("benefitId", "jobId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_349e34eb35b30738de6f3d5ce6" ON "benefit_jobs_job" ("benefitId") `);
        await queryRunner.query(`CREATE INDEX "IDX_97c7b6a49f4b586b5560dc461b" ON "benefit_jobs_job" ("jobId") `);
        await queryRunner.query(`CREATE TABLE "category_companies_company" ("categoryId" uuid NOT NULL, "companyId" uuid NOT NULL, CONSTRAINT "PK_ab871b2bf7e0cf1d9a11b0af552" PRIMARY KEY ("categoryId", "companyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dd9638a0f26082ee39c9d43267" ON "category_companies_company" ("categoryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_71f3e77709d405a25811eb7c19" ON "category_companies_company" ("companyId") `);
        await queryRunner.query(`CREATE TABLE "category_jobs_job" ("categoryId" uuid NOT NULL, "jobId" uuid NOT NULL, CONSTRAINT "PK_77e7d40a5ab36c1b7f2a4a6d277" PRIMARY KEY ("categoryId", "jobId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5d1be3476707b9f09b7f0c33f2" ON "category_jobs_job" ("categoryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b841c30f0563766b29b210526c" ON "category_jobs_job" ("jobId") `);
        await queryRunner.query(`CREATE TABLE "job_type_jobs_job" ("jobTypeId" uuid NOT NULL, "jobId" uuid NOT NULL, CONSTRAINT "PK_85849ae9d274ac904105191fcf9" PRIMARY KEY ("jobTypeId", "jobId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c4a7dbcdf955e3839a1100c223" ON "job_type_jobs_job" ("jobTypeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a15c3ff7e7b4e26bf33b22f752" ON "job_type_jobs_job" ("jobId") `);
        await queryRunner.query(`CREATE TABLE "job_benefits_benefit" ("jobId" uuid NOT NULL, "benefitId" uuid NOT NULL, CONSTRAINT "PK_8f7eefc0c76d94bbe6703d27e7b" PRIMARY KEY ("jobId", "benefitId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_79d30a9fdb8c91529a7863ac1f" ON "job_benefits_benefit" ("jobId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f7587b5c04b8155b2a3be14995" ON "job_benefits_benefit" ("benefitId") `);
        await queryRunner.query(`CREATE TABLE "job_locations_location" ("jobId" uuid NOT NULL, "locationId" uuid NOT NULL, CONSTRAINT "PK_1709297f84f7e4ba08bb4ffe77f" PRIMARY KEY ("jobId", "locationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b93f7870a89703069aced3d182" ON "job_locations_location" ("jobId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8f3e0d8c377fb1ebd2d9b4b164" ON "job_locations_location" ("locationId") `);
        await queryRunner.query(`CREATE TABLE "skill_jobs_job" ("skillId" uuid NOT NULL, "jobId" uuid NOT NULL, CONSTRAINT "PK_db3163fc84298cfe30d86bef2c6" PRIMARY KEY ("skillId", "jobId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f8b8643becafc4bc37d1fedbd9" ON "skill_jobs_job" ("skillId") `);
        await queryRunner.query(`CREATE INDEX "IDX_67d2aa80627a0efcf39fe2bca2" ON "skill_jobs_job" ("jobId") `);
        await queryRunner.query(`ALTER TABLE "job" ADD CONSTRAINT "FK_e66170573cabd565dab1132727d" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "location_companies_company" ADD CONSTRAINT "FK_c87c761a1b97eed39a809e8d07f" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "location_companies_company" ADD CONSTRAINT "FK_ab9fad7baf8cf0629bdb8fde6a3" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "location_jobs_job" ADD CONSTRAINT "FK_859e82fabf6dddfccbaa4b3fcfd" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "location_jobs_job" ADD CONSTRAINT "FK_c763dfbd98b28b256803876cf1e" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "technology_companies_company" ADD CONSTRAINT "FK_778320b324cd0736d75d66a79a0" FOREIGN KEY ("technologyId") REFERENCES "technology"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "technology_companies_company" ADD CONSTRAINT "FK_798ca3c1d63b9d1ebfaf4ad4358" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "technology_jobs_job" ADD CONSTRAINT "FK_0c4b6c2b26d7755a2a2189cb9da" FOREIGN KEY ("technologyId") REFERENCES "technology"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "technology_jobs_job" ADD CONSTRAINT "FK_a4d82e86bed0665f467c3edd7ee" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "benefit_companies_company" ADD CONSTRAINT "FK_8938fb7736a2fd2e87b9683cb67" FOREIGN KEY ("benefitId") REFERENCES "benefit"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "benefit_companies_company" ADD CONSTRAINT "FK_6c9c015144b4f873db4dd737745" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "benefit_jobs_job" ADD CONSTRAINT "FK_349e34eb35b30738de6f3d5ce66" FOREIGN KEY ("benefitId") REFERENCES "benefit"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "benefit_jobs_job" ADD CONSTRAINT "FK_97c7b6a49f4b586b5560dc461b8" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_companies_company" ADD CONSTRAINT "FK_dd9638a0f26082ee39c9d432670" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "category_companies_company" ADD CONSTRAINT "FK_71f3e77709d405a25811eb7c196" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_jobs_job" ADD CONSTRAINT "FK_5d1be3476707b9f09b7f0c33f25" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "category_jobs_job" ADD CONSTRAINT "FK_b841c30f0563766b29b210526ca" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_type_jobs_job" ADD CONSTRAINT "FK_c4a7dbcdf955e3839a1100c223d" FOREIGN KEY ("jobTypeId") REFERENCES "job_type"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "job_type_jobs_job" ADD CONSTRAINT "FK_a15c3ff7e7b4e26bf33b22f7521" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_benefits_benefit" ADD CONSTRAINT "FK_79d30a9fdb8c91529a7863ac1f4" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "job_benefits_benefit" ADD CONSTRAINT "FK_f7587b5c04b8155b2a3be14995c" FOREIGN KEY ("benefitId") REFERENCES "benefit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_locations_location" ADD CONSTRAINT "FK_b93f7870a89703069aced3d1829" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "job_locations_location" ADD CONSTRAINT "FK_8f3e0d8c377fb1ebd2d9b4b1647" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "skill_jobs_job" ADD CONSTRAINT "FK_f8b8643becafc4bc37d1fedbd91" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "skill_jobs_job" ADD CONSTRAINT "FK_67d2aa80627a0efcf39fe2bca21" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill_jobs_job" DROP CONSTRAINT "FK_67d2aa80627a0efcf39fe2bca21"`);
        await queryRunner.query(`ALTER TABLE "skill_jobs_job" DROP CONSTRAINT "FK_f8b8643becafc4bc37d1fedbd91"`);
        await queryRunner.query(`ALTER TABLE "job_locations_location" DROP CONSTRAINT "FK_8f3e0d8c377fb1ebd2d9b4b1647"`);
        await queryRunner.query(`ALTER TABLE "job_locations_location" DROP CONSTRAINT "FK_b93f7870a89703069aced3d1829"`);
        await queryRunner.query(`ALTER TABLE "job_benefits_benefit" DROP CONSTRAINT "FK_f7587b5c04b8155b2a3be14995c"`);
        await queryRunner.query(`ALTER TABLE "job_benefits_benefit" DROP CONSTRAINT "FK_79d30a9fdb8c91529a7863ac1f4"`);
        await queryRunner.query(`ALTER TABLE "job_type_jobs_job" DROP CONSTRAINT "FK_a15c3ff7e7b4e26bf33b22f7521"`);
        await queryRunner.query(`ALTER TABLE "job_type_jobs_job" DROP CONSTRAINT "FK_c4a7dbcdf955e3839a1100c223d"`);
        await queryRunner.query(`ALTER TABLE "category_jobs_job" DROP CONSTRAINT "FK_b841c30f0563766b29b210526ca"`);
        await queryRunner.query(`ALTER TABLE "category_jobs_job" DROP CONSTRAINT "FK_5d1be3476707b9f09b7f0c33f25"`);
        await queryRunner.query(`ALTER TABLE "category_companies_company" DROP CONSTRAINT "FK_71f3e77709d405a25811eb7c196"`);
        await queryRunner.query(`ALTER TABLE "category_companies_company" DROP CONSTRAINT "FK_dd9638a0f26082ee39c9d432670"`);
        await queryRunner.query(`ALTER TABLE "benefit_jobs_job" DROP CONSTRAINT "FK_97c7b6a49f4b586b5560dc461b8"`);
        await queryRunner.query(`ALTER TABLE "benefit_jobs_job" DROP CONSTRAINT "FK_349e34eb35b30738de6f3d5ce66"`);
        await queryRunner.query(`ALTER TABLE "benefit_companies_company" DROP CONSTRAINT "FK_6c9c015144b4f873db4dd737745"`);
        await queryRunner.query(`ALTER TABLE "benefit_companies_company" DROP CONSTRAINT "FK_8938fb7736a2fd2e87b9683cb67"`);
        await queryRunner.query(`ALTER TABLE "technology_jobs_job" DROP CONSTRAINT "FK_a4d82e86bed0665f467c3edd7ee"`);
        await queryRunner.query(`ALTER TABLE "technology_jobs_job" DROP CONSTRAINT "FK_0c4b6c2b26d7755a2a2189cb9da"`);
        await queryRunner.query(`ALTER TABLE "technology_companies_company" DROP CONSTRAINT "FK_798ca3c1d63b9d1ebfaf4ad4358"`);
        await queryRunner.query(`ALTER TABLE "technology_companies_company" DROP CONSTRAINT "FK_778320b324cd0736d75d66a79a0"`);
        await queryRunner.query(`ALTER TABLE "location_jobs_job" DROP CONSTRAINT "FK_c763dfbd98b28b256803876cf1e"`);
        await queryRunner.query(`ALTER TABLE "location_jobs_job" DROP CONSTRAINT "FK_859e82fabf6dddfccbaa4b3fcfd"`);
        await queryRunner.query(`ALTER TABLE "location_companies_company" DROP CONSTRAINT "FK_ab9fad7baf8cf0629bdb8fde6a3"`);
        await queryRunner.query(`ALTER TABLE "location_companies_company" DROP CONSTRAINT "FK_c87c761a1b97eed39a809e8d07f"`);
        await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "FK_e66170573cabd565dab1132727d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67d2aa80627a0efcf39fe2bca2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f8b8643becafc4bc37d1fedbd9"`);
        await queryRunner.query(`DROP TABLE "skill_jobs_job"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8f3e0d8c377fb1ebd2d9b4b164"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b93f7870a89703069aced3d182"`);
        await queryRunner.query(`DROP TABLE "job_locations_location"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f7587b5c04b8155b2a3be14995"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_79d30a9fdb8c91529a7863ac1f"`);
        await queryRunner.query(`DROP TABLE "job_benefits_benefit"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a15c3ff7e7b4e26bf33b22f752"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c4a7dbcdf955e3839a1100c223"`);
        await queryRunner.query(`DROP TABLE "job_type_jobs_job"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b841c30f0563766b29b210526c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d1be3476707b9f09b7f0c33f2"`);
        await queryRunner.query(`DROP TABLE "category_jobs_job"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_71f3e77709d405a25811eb7c19"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dd9638a0f26082ee39c9d43267"`);
        await queryRunner.query(`DROP TABLE "category_companies_company"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97c7b6a49f4b586b5560dc461b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_349e34eb35b30738de6f3d5ce6"`);
        await queryRunner.query(`DROP TABLE "benefit_jobs_job"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6c9c015144b4f873db4dd73774"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8938fb7736a2fd2e87b9683cb6"`);
        await queryRunner.query(`DROP TABLE "benefit_companies_company"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a4d82e86bed0665f467c3edd7e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c4b6c2b26d7755a2a2189cb9d"`);
        await queryRunner.query(`DROP TABLE "technology_jobs_job"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_798ca3c1d63b9d1ebfaf4ad435"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_778320b324cd0736d75d66a79a"`);
        await queryRunner.query(`DROP TABLE "technology_companies_company"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c763dfbd98b28b256803876cf1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_859e82fabf6dddfccbaa4b3fcf"`);
        await queryRunner.query(`DROP TABLE "location_jobs_job"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ab9fad7baf8cf0629bdb8fde6a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c87c761a1b97eed39a809e8d07"`);
        await queryRunner.query(`DROP TABLE "location_companies_company"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "brand"`);
        await queryRunner.query(`DROP TABLE "skill"`);
        await queryRunner.query(`DROP TABLE "job"`);
        await queryRunner.query(`DROP TABLE "job_type"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "benefit"`);
        await queryRunner.query(`DROP TABLE "technology"`);
        await queryRunner.query(`DROP TABLE "location"`);
    }

}
