import CustomButton from "@components/common/CustomButton";
import FormContainer from "@components/common/FormContainer";
import { usePaymentMethod } from "@hooks/usePaymentMethod";
import { useMemoizedTranslation } from "@hooks/useTranslation";
import { PaymentElement } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const { useStripe, useElements, isProcessingPayment, submitPayment } =
    usePaymentMethod();
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useMemoizedTranslation();

  const handleSubmit = async (e?: React.SyntheticEvent<HTMLFormElement>) => {
    if (!e) {
      return;
    }
    e.preventDefault();
    await submitPayment(stripe, elements);
  };

  return (
    <FormContainer id="payment-form" formTitle={t("formTitles.checkout")}>
      <PaymentElement id="payment-element" />
      <CustomButton
        buttonLabel={t("buttons.payment.confirmPaymentLabel")}
        disabled={!stripe || !elements}
        type="submit"
        onClick={handleSubmit}
        isLoading={isProcessingPayment}
        loadingLabel={t("buttons.payment.confirmPaymentLabelInProgress")}
      />
    </FormContainer>
  );
}
