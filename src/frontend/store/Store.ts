import { configureStore, type ThunkAction, type Action} from "@reduxjs/toolkit";

import { rulesSlice } from "./rulesSlice";

export const Store = configureStore(
{
	reducer:
	{ 
		rules: rulesSlice 
	}
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppStore = typeof Store;
export type AppDispatch = typeof Store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>