import { MAPEABLE_STRIPE_ERROR_TYPES } from "@constants/index";
import { getClientSecret, getPublishableKey } from "@services/paymentServices";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { Stripe, StripeElements, StripeError, loadStripe } from "@stripe/stripe-js";
import { useCallback, useEffect, useState } from "react";

export const usePaymentMethod = () => {
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();
    const [clientSecret, setClientSecret] = useState<string>("");
    const [error, setError] = useState<string | null | StripeError>(null);
    const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);


    const fetchPublishableKey = useCallback(async () => {
        try {
            const publishableKey = await getPublishableKey()
            if (publishableKey !== null) {
                setStripePromise(loadStripe(publishableKey));
            }
        } catch (error) {
            setError(error as string)
        }
    }, [])

    const fetchClientSecret = useCallback(async () => {
        try {
            const clientSecret = await getClientSecret();
            setClientSecret(clientSecret);
        } catch (error) {
            setError(error as string)
        }
    }, [])

    const submitPayment = useCallback(async (stripe: Stripe | null, elements: StripeElements | null) => {
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        setIsProcessingPayment(true);
        try {
            const response = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    // Make sure to change this to your payment completion page
                    return_url: `${window.location.origin}/payment/confirm`,
                },
            });
            const { error } = response;
            if (error && error.type && MAPEABLE_STRIPE_ERROR_TYPES.includes(error.type)) {
                throw Error(error.message ? error.message : "")
            }
            setIsProcessingPayment(false)
            return;
        } catch (error) {
            console.log("error", error)
            setIsProcessingPayment(false)
        }

        setIsProcessingPayment(false)
    }, [])

    useEffect(() => {
        fetchPublishableKey()
        fetchClientSecret()
    }, [fetchClientSecret, fetchPublishableKey])

    return { stripePromise, clientSecret, error, useStripe, useElements, submitPayment, isProcessingPayment }

}