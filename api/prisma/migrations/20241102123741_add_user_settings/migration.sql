-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "theme" TEXT NOT NULL DEFAULT 'dark',
    "emailNotifications" BOOLEAN NOT NULL DEFAULT false,
    "taskReminders" BOOLEAN NOT NULL DEFAULT false,
    "displayName" TEXT,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_userId_key" ON "Settings"("userId");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
