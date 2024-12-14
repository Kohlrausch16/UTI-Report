/*
  Warnings:

  - Added the required column `doctor_id` to the `procedures` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `procedures` DROP FOREIGN KEY `procedures_patient_id_fkey`;

-- AlterTable
ALTER TABLE `procedures` ADD COLUMN `doctor_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `doctors` (
    `doctor_id` VARCHAR(191) NOT NULL,
    `doctor_name` VARCHAR(191) NOT NULL,
    `doctor_first_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`doctor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `procedures` ADD CONSTRAINT `procedures_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`patient_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedures` ADD CONSTRAINT `procedures_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`doctor_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
