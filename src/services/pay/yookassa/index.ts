import { ICreatePayment, YooCheckout } from "@a2seven/yoo-checkout";
import getUUID from "../../../utils/UUID/getUUID";
import "dotenv/config";

const yookassa = new YooCheckout({
  shopId: process.env.SHOP_ID || "",
  secretKey: process.env.SHOP_SECRET_KEY || "",
});

export const pay = async (userId: string, orderId: string, value: string) => {
  const idempotenceKey = getUUID(); // "02347fc4-a1f0-49db-807e-f0d67c2ed5a5"

  const createPayload: ICreatePayment = {
    amount: {
      value,
      currency: "RUB",
    },
    payment_method_data: {
      type: "bank_card",
    },
    confirmation: {
      type: "redirect",
      return_url: "test",
    },
    metadata: {
      userId,
      orderId,
    },
  };

  try {
    const payment = await yookassa.createPayment(createPayload, idempotenceKey);

    console.error(payment);

    return payment;
  } catch (error) {
    console.error(error);

    return error;
  }
};
