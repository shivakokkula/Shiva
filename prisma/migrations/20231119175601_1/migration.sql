-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_on" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_on" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50),
    "profile_pic" VARCHAR(255),
    "otp" INTEGER,
    "pw_reset_token" VARCHAR(1024),
    "fb_token" TEXT,
    "created_on" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_on" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payx_user" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "code" VARCHAR(100) NOT NULL,
    "created_on" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_on" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Payx_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet_history" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "payment_id" VARCHAR(100) NOT NULL,
    "created_on" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payx_user_id" INTEGER NOT NULL,

    CONSTRAINT "Wallet_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Qr" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "event_id" INTEGER,
    "user_id" INTEGER,
    "created_on" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_on" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Qr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "can_recharge" BOOLEAN NOT NULL DEFAULT true,
    "can_refund" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff_recharge_history" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "payment_id" VARCHAR(100) NOT NULL,
    "pay_method" TEXT NOT NULL DEFAULT 'Online',
    "created_on" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "staff_id" INTEGER NOT NULL,

    CONSTRAINT "Staff_recharge_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "location" VARCHAR(150),
    "gst" VARCHAR(50),
    "phone" VARCHAR(20),
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "start_date" VARCHAR(50) NOT NULL,
    "end_date" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "approved" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "video" VARCHAR(255),
    "amount" DOUBLE PRECISION DEFAULT 0,
    "remaining_amount" DOUBLE PRECISION DEFAULT 0,
    "start_time" VARCHAR(50),
    "end_time" VARCHAR(50),
    "images" TEXT[],
    "created_on" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_on" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "host_id" INTEGER,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_on" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Payx_user_code_key" ON "Payx_user"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Payx_user_user_id_key" ON "Payx_user"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Qr_code_key" ON "Qr"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Event_name_key" ON "Event"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FAQ_title_key" ON "FAQ"("title");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payx_user" ADD CONSTRAINT "Payx_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet_history" ADD CONSTRAINT "Wallet_history_payx_user_id_fkey" FOREIGN KEY ("payx_user_id") REFERENCES "Payx_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qr" ADD CONSTRAINT "Qr_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qr" ADD CONSTRAINT "Qr_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff_recharge_history" ADD CONSTRAINT "Staff_recharge_history_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
