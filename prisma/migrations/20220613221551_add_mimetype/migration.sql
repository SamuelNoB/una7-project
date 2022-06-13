-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Partner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "image" TEXT NOT NULL,
    "imageType" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Partner" ("active", "id", "image", "link", "name") SELECT "active", "id", "image", "link", "name" FROM "Partner";
DROP TABLE "Partner";
ALTER TABLE "new_Partner" RENAME TO "Partner";
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "clientPhoto" TEXT NOT NULL,
    "photoType" TEXT NOT NULL DEFAULT '',
    "link" TEXT
);
INSERT INTO "new_Client" ("clientPhoto", "id", "link", "name", "visible") SELECT "clientPhoto", "id", "link", "name", "visible" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE TABLE "new_Publication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "imageType" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Publication_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Publication" ("active", "authorId", "content", "coverImage", "createdAt", "id", "subTitle", "title", "updatedAt") SELECT "active", "authorId", "content", "coverImage", "createdAt", "id", "subTitle", "title", "updatedAt" FROM "Publication";
DROP TABLE "Publication";
ALTER TABLE "new_Publication" RENAME TO "Publication";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
