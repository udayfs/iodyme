-- CreateEnum
CREATE TYPE "LocationTypeEnum" AS ENUM ('IN_OFFICE', 'HYBRID', 'REMOTE');

-- CreateEnum
CREATE TYPE "ExperienceLevelEnum" AS ENUM ('FRESHER', 'JUNIOR', 'MID_LEVEL', 'SENIOR');

-- CreateEnum
CREATE TYPE "JobPostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'DELISTED');

-- CreateEnum
CREATE TYPE "JobTypeEnum" AS ENUM ('INTERNSHIP', 'PART_TIME', 'FULL_TIME');

-- CreateEnum
CREATE TYPE "ApplicationStatusEnum" AS ENUM ('APPLIED', 'REJECTED', 'INTERESTED', 'INTERVIEWED', 'HIRED');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "isSubscribed" BOOLEAN NOT NULL DEFAULT false,
    "subscriptionEnds" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Organisation" (
    "org_id" TEXT NOT NULL,
    "organisation_name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("org_id")
);

-- CreateTable
CREATE TABLE "JobPost" (
    "post_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "JobTypeEnum" NOT NULL,
    "status" "JobPostStatus" NOT NULL DEFAULT 'DRAFT',
    "location_type" "LocationTypeEnum" NOT NULL,
    "state" TEXT,
    "city" TEXT,
    "salary" DOUBLE PRECISION,
    "experience" "ExperienceLevelEnum" NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organisationId" TEXT NOT NULL,

    CONSTRAINT "JobPost_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "ApplicationStatusEnum" NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateTable
CREATE TABLE "_OrganisationAdmins" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_OrganisationAdmins_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "_OrganisationAdmins_B_index" ON "_OrganisationAdmins"("B");

-- AddForeignKey
ALTER TABLE "JobPost" ADD CONSTRAINT "JobPost_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("org_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_postId_fkey" FOREIGN KEY ("postId") REFERENCES "JobPost"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganisationAdmins" ADD CONSTRAINT "_OrganisationAdmins_A_fkey" FOREIGN KEY ("A") REFERENCES "Organisation"("org_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganisationAdmins" ADD CONSTRAINT "_OrganisationAdmins_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
