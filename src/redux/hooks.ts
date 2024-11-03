import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "@redux/types/index";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
