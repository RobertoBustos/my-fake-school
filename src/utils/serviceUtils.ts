export const fakeDelayPromise = async (promise?: Promise<any>, timeout = 500) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    }).then(() => promise);
}

export const fakeEmailValidator = async (email: string) => {
    console.log("calling the validation service")
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?email=${email}`
    );
    const data = await response.json();
    return data.length === 0;
}