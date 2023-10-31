/*
  Warnings:

  - Added the required column `owner_id` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avarage_price` on table `List` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "owner_id" TEXT NOT NULL,
ALTER COLUMN "avarage_price" SET DEFAULT 0,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '';

-- AlterTable
ALTER TABLE "List" ALTER COLUMN "avarage_price" SET NOT NULL,
ALTER COLUMN "avarage_price" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
