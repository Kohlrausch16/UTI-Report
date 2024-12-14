/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `patients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[procedure_id]` on the table `patients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `patients` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `procedures` (
    `procedure_id` VARCHAR(191) NOT NULL,
    `report_code` VARCHAR(191) NOT NULL,
    `procedure` VARCHAR(191) NOT NULL,
    `bed` VARCHAR(191) NOT NULL,
    `procedure_status` VARCHAR(191) NOT NULL,
    `procedure_date` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NOT NULL,
    `patient_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`procedure_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `patients_cpf_key` ON `patients`(`cpf`);

-- CreateIndex
CREATE UNIQUE INDEX `patients_procedure_id_key` ON `patients`(`procedure_id`);

-- AddForeignKey
ALTER TABLE `procedures` ADD CONSTRAINT `procedures_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;
