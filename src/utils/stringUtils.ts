import { v4 as uuidv4 } from "uuid";

export const generateRandomUid = (): string => {
    return uuidv4();
};