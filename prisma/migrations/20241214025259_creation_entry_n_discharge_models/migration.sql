/*
  Warnings:

  - You are about to alter the column `procedure_date` on the `procedures` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - A unique constraint covering the columns `[procedure_id]` on the table `doctors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `procedure_id` to the `doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctors` ADD COLUMN `procedure_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `procedures` MODIFY `procedure_date` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `entry` (
    `entry_id` VARCHAR(191) NOT NULL,
    `entry_date` DATETIME(3) NOT NULL,
    `symptoms` VARCHAR(191) NOT NULL,
    `previous_diagnosis` VARCHAR(191) NOT NULL,
    `clinical_conditions` VARCHAR(191) NOT NULL,
    `note` TEXT NOT NULL,
    `patient_id` VARCHAR(191) NOT NULL,
    `procedure_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`entry_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `discharges` (
    `discharge_id` VARCHAR(191) NOT NULL,
    `discharge_date` DATETIME(3) NOT NULL,
    `discharge_cause` VARCHAR(191) NOT NULL,
    `note` TEXT NOT NULL,
    `patient_id` VARCHAR(191) NOT NULL,
    `procedure_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `discharges_procedure_id_key`(`procedure_id`),
    PRIMARY KEY (`discharge_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `doctors_procedure_id_key` ON `doctors`(`procedure_id`);
