import { v4 as uuidv4 } from "uuid";

export const generateRandomUid = (): string => {
  return uuidv4();
};

export const fakeDelayPromise = async (promise: any) => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  }).then(() => promise);
}
