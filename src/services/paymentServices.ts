
export const getPublishableKey = async (): Promise<any | null> => {
    try {
        const result = await fetch("/config");
        const { publishableKey } = await result.json();
        return publishableKey
    } catch {
        return null
    }
}

export const getClientSecret = async (): Promise<string> => {
    try {
        const result = await fetch("/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({}),
        });
        const { clientSecret } = await result.json();
        return clientSecret
    } catch {
        return ""
    }
}
