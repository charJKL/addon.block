import { configureStore } from "@reduxjs/toolkit";

import { rulesSlice } from "./rulesSlice";

export const Store = configureStore(
{
	reducer:
	{ 
		rules: rulesSlice 
	}
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export type AppStore = typeof Store;
