import PaymentDetails from "@components/PaymentDetails";
import Layout from "@components/common/Layout";
import CheckoutForm from "@components/forms/CheckoutForm";
import { usePaymentMethod } from "@hooks/usePaymentMethod";
import { Elements } from "@stripe/react-stripe-js";

export const PaymentsPage = () => {
  const { clientSecret, stripePromise } = usePaymentMethod();

  const headerProps = {
    showBackButton: true,
    showLanguageSelector: true,
  };

  return (
    <Layout header={headerProps}>
      {clientSecret && stripePromise ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      ) : null}
    </Layout>
  );
};

export const PaymentsConfirmationPage = () => {
  const headerProps = {
    showBackButton: true,
    showLanguageSelector: true,
  };

  return (
    <Layout header={headerProps}>
      <PaymentDetails />
    </Layout>
  );
};
