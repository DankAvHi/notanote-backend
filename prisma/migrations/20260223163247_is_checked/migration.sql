-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "isChecked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "image" DROP NOT NULL;
