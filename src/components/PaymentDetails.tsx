import { useMemoizedTranslation } from "@hooks/useTranslation";
import { PaymentIntent } from "@stripe/stripe-js";
import "@styles/components/PaymentDetails.css";
import { FaCheckCircle } from "react-icons/fa";
import CustomText from "./common/CustomText";

export type PaymentDetailsPropsType = {
  data: PaymentIntent;
};

const PaymentDetails = () => {
  const { t } = useMemoizedTranslation();

  return (
    <div className="container">
      <FaCheckCircle className="checkicon" />
      <CustomText
        text={t("confirmations.payment.purchaseCompleted")}
        className="amounttext"
      />
      <CustomText
        text={t("confirmations.payment.thankyouText")}
        className="thankyoutext"
      />
    </div>
  );
};

export default PaymentDetails;
