/*
  Warnings:

  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `clientPhotoId` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `coverImageId` on the `Publication` table. All the data in the column will be lost.
  - Added the required column `clientPhoto` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverImage` to the `Publication` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "File";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "clientPhoto" TEXT NOT NULL,
    "link" TEXT
);
INSERT INTO "new_Client" ("id", "link", "name", "visible") SELECT "id", "link", "name", "visible" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE TABLE "new_Partner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "image" TEXT NOT NULL
);
INSERT INTO "new_Partner" ("active", "id", "link", "name") SELECT "active", "id", "link", "name" FROM "Partner";
DROP TABLE "Partner";
ALTER TABLE "new_Partner" RENAME TO "Partner";
CREATE TABLE "new_Publication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Publication_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Publication" ("active", "authorId", "content", "createdAt", "id", "subTitle", "title", "updatedAt") SELECT "active", "authorId", "content", "createdAt", "id", "subTitle", "title", "updatedAt" FROM "Publication";
DROP TABLE "Publication";
ALTER TABLE "new_Publication" RENAME TO "Publication";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
