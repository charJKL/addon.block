import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from './Store';
import { createAppAsyncThunk } from "./hooks";

import { FrontendComm as FrontendCommApi } from "browser-extension-std/frontend"; // TODO move this to other file
import type { REST, RuleList, RuleDesc, Rule, RuleDescId} from "@/backend/addon.block";
const FrontendComm = new FrontendCommApi<REST>(); // TODO move this initialization to separate file

export type { Rule };
export enum Status { Idle = 0, Pending = 1, Succeeded = 2, Failed = 3 };

export interface RulesState
{
	get: { status: Status },
	post: { status: Status },
	list: RuleList,
}

const initialState : RulesState = 
{
	get: { status: Status.Idle },
	post: { status: Status.Idle },
	list: [],
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
			console.log("Update list", state, action); // TODO remove this
		}
	},
	extraReducers: builder =>
	{
		// TODO DRY rule, refactor it.
		builder.addCase(getRules.pending, (state) => { state.get.status = Status.Pending })
		builder.addCase(getRules.rejected, (state) => { state.get.status = Status.Failed })
		builder.addCase(getRules.fulfilled, (state, action) => 
		{
			state.get.status = Status.Succeeded;
			state.list = action.payload;
		});

		builder.addCase(addRule.pending, (state) => { state.post.status = Status.Pending });
		builder.addCase(addRule.rejected, (state) => { state.post.status = Status.Failed });
		builder.addCase(addRule.fulfilled, (state, action) => 
		{
			state.post.status = Status.Pending;
			state.list.push(action.payload);
		});
	}
});

export const getRules = createAppAsyncThunk(
	"rules/getRules", 
	async () => 
	{
		console.log("Frontend", "GetRulesThunk");
		const response = await FrontendComm.sendToEndpoint("GET://rules", []);
		console.log("Frontend", "GetRulesThunk", "response=", response);
		return response;
	},
	{
		condition: (arg, api) => api.getState().rules.get.status == Status.Idle
	}
);
export const addRule = createAppAsyncThunk("rules/addRule", async (rule: RuleDesc) => 
{
	console.log("Frontend", "addRuleThunk");
	const response = await FrontendComm.sendToEndpoint("POST://rules", [rule]);
	console.log("Frontend", "addRuleThunk", "response=", response);
	return response;
});
export const removeRule = createAppAsyncThunk("rules/removeRule", async (rule: RuleDescId) =>
{
	console.log("Frontend", "Send delete message to backend", rule);
})

export const selectList = (state: RootState) => state.rules.list;
export const selectRuleById = (id: string) => (state: RootState) : Rule | null => state.rules.list.find(rule => rule.id === id) ?? null;


export const { updateList } = slice.actions;
export const rulesSlice = slice.reducer;