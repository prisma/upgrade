ALTER TABLE `User` CHANGE `role` `role` ENUM('ADMIN', 'CUSTOMER') NOT NULL;
ALTER TABLE `User` CHANGE `role` `role` ENUM('ADMIN', 'CUSTOMER') NOT NULL DEFAULT 'CUSTOMER';
ALTER TABLE `User` CHANGE `jsonData` `jsonData` JSON ;
ALTER TABLE `Post` CHANGE `createdAt` `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `Post` CHANGE `published` `published` TINYINT(1) NOT NULL DEFAULT 0;
ALTER TABLE `Profile` ADD UNIQUE (`user`);
ALTER TABLE `Post` ADD COLUMN `authorId` char(25) CHARACTER SET utf8 ;
ALTER TABLE `Post` ADD CONSTRAINT author FOREIGN KEY (`authorId`) REFERENCES `User`(`id`);
UPDATE `Post`, `_PostToUser` SET `Post`.`authorId` = `_PostToUser`.B where `_PostToUser`.A = `Post`.`id`;
DROP TABLE `_PostToUser`;