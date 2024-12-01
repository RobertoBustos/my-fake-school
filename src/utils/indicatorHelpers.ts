import { IndicatorsState } from "@redux/types";
import { v4 as uuidv4 } from "uuid";

export const generateRandomUid = (): string => {
    return uuidv4();
};

export const addAlertToState = (state: IndicatorsState, message: string, type: "success" | "danger" | "warning", dismisable: boolean) => {
    return [
        ...state.alerts,
        {
            alertId: generateRandomUid(),
            message: message,
            type: type,
            dismisable: dismisable,
        },
    ];
}