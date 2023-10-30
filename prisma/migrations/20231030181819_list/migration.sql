/*
  Warnings:

  - You are about to drop the column `listId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `List` table. All the data in the column will be lost.
  - Added the required column `avarage_price` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `list_id` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `List` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('RECEIVE', 'RECEIVED', 'ALREADY_HAVE');

-- CreateEnum
CREATE TYPE "ItemPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'UNDEFINED', 'URGENT');

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_listId_fkey";

-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_ownerId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "listId",
DROP COLUMN "price",
ADD COLUMN     "avarage_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "list_id" TEXT NOT NULL,
ADD COLUMN     "priority" "ItemPriority" NOT NULL DEFAULT 'UNDEFINED',
ADD COLUMN     "status" "ItemStatus" NOT NULL DEFAULT 'RECEIVE',
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "category" DROP NOT NULL;

-- AlterTable
ALTER TABLE "List" DROP COLUMN "ownerId",
ADD COLUMN     "avarage_price" DOUBLE PRECISION,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "owner_id" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "privacy" SET DEFAULT 'PRIVATE';

-- CreateTable
CREATE TABLE "ItemLink" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemLink" ADD CONSTRAINT "ItemLink_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
