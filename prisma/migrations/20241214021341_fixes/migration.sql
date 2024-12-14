-- DropIndex
DROP INDEX `procedures_doctor_id_fkey` ON `procedures`;

-- AddForeignKey
ALTER TABLE `procedures` ADD CONSTRAINT `procedures_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`doctor_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
