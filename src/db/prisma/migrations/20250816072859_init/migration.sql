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
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image_url" TEXT NOT NULL,
    "isSubscribed" BOOLEAN NOT NULL DEFAULT false,
    "subscriptionEnds" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "password" TEXT,
    "salt" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Organisation" (
    "org_id" TEXT NOT NULL,
    "org_name" TEXT NOT NULL,
    "image_url" TEXT,
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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserResume_userId_key" ON "UserResume"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserNotificationSettings_userId_key" ON "UserNotificationSettings"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPost" ADD CONSTRAINT "JobPost_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("org_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_postId_fkey" FOREIGN KEY ("postId") REFERENCES "JobPost"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserResume" ADD CONSTRAINT "UserResume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNotificationSettings" ADD CONSTRAINT "UserNotificationSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
