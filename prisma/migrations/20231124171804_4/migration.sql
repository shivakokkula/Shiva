/*
  Warnings:

  - Added the required column `qr_id` to the `Staff_recharge_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Qr" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Staff_recharge_history" ADD COLUMN     "qr_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Refund_history" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "ac_num" VARCHAR(100) NOT NULL,
    "ifsc_code" VARCHAR(100) NOT NULL,
    "bank_name" VARCHAR(100) NOT NULL,
    "ac_holder_name" VARCHAR(100) NOT NULL,
    "created_on" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_on" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "qr_id" INTEGER NOT NULL,
    "staff_id" INTEGER NOT NULL,

    CONSTRAINT "Refund_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Staff_recharge_history" ADD CONSTRAINT "Staff_recharge_history_qr_id_fkey" FOREIGN KEY ("qr_id") REFERENCES "Qr"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund_history" ADD CONSTRAINT "Refund_history_qr_id_fkey" FOREIGN KEY ("qr_id") REFERENCES "Qr"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund_history" ADD CONSTRAINT "Refund_history_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
