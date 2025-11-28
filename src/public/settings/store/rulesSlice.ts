import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from './Store';


export type Rule =
{
	name: string,
	isActive: boolean
}

export interface RulesState
{
	list: Array<Rule>
}

const initialState : RulesState = 
{
	list: [
		{ name: "www.testint.com", isActive: true },
		{ name: "www.testint.com", isActive: true },
		{ name: "www.testint.com", isActive: true },
		{ name: "www.testint.com", isActive: true }
	]
}

const slice = createSlice(
{
	name: "rules",
	initialState,
	reducers:
	{
		updateList: (state,  action: PayloadAction<Rule>) =>
		{
			state.list.push(action.payload);
			console.log("Update list", state, action);
		}
	}
});

export const { updateList } = slice.actions;

export const SelectList = (state: RootState) => state.rules.list;

export const rulesSlice = slice.reducer;