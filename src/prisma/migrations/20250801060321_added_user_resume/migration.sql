/*
  Warnings:

  - You are about to drop the column `organisation_name` on the `Organisation` table. All the data in the column will be lost.
  - You are about to drop the `_OrganisationAdmins` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `org_name` to the `Organisation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OrganisationAdmins" DROP CONSTRAINT "_OrganisationAdmins_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrganisationAdmins" DROP CONSTRAINT "_OrganisationAdmins_B_fkey";

-- AlterTable
ALTER TABLE "Organisation" DROP COLUMN "organisation_name",
ADD COLUMN     "org_name" TEXT NOT NULL,
ALTER COLUMN "image_url" DROP NOT NULL;

-- DropTable
DROP TABLE "_OrganisationAdmins";

-- CreateTable
CREATE TABLE "UserResume" (
    "userId" TEXT NOT NULL,
    "resumeFileUrl" TEXT NOT NULL,
    "resumeFileKey" TEXT NOT NULL,
    "aiSummary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserResume_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserNotificationSettings" (
    "userId" TEXT NOT NULL,
    "newJobEmailNotification" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserNotificationSettings_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserResume_userId_key" ON "UserResume"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserNotificationSettings_userId_key" ON "UserNotificationSettings"("userId");

-- AddForeignKey
ALTER TABLE "UserResume" ADD CONSTRAINT "UserResume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNotificationSettings" ADD CONSTRAINT "UserNotificationSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
