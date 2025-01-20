import { TypedDispatch } from "resources/store/StoreProvider";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<TypedDispatch>();
