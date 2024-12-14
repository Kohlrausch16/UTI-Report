-- CreateTable
CREATE TABLE `patients` (
    `patient_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `age` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(3) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `mother_name` VARCHAR(191) NOT NULL,
    `relative_name` VARCHAR(191) NOT NULL,
    `relative_first_name` VARCHAR(191) NOT NULL,
    `familiar_stand` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `procedure_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`patient_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
