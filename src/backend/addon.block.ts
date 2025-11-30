import { LocalStorage as LocalStorageApi } from "browser-extension-std/backend";
import { NetRequest as NetRequestApi } from "browser-extension-std/backend";
import { BackendComm as BackendCommApi } from "browser-extension-std/backend";

import { RulesService as RulesServiceImpl} from "./service/RulesService";

// TODO this should go to separate file
import type { Rule, RuleDesc, RuleList, RuleDescId, RuleDeleted } from "./service/RulesService";
export type { Rule, RuleDesc, RuleList, RuleDescId, RuleDeleted } from "./service/RulesService";
export type REST = // TODO use zod library bo build this
{
	"GET://rules": () => RuleList;
	"GET://rules/$id": (id: RuleDescId) => Rule;
	"POST://rules": (rule: RuleDesc) => Rule;
	"DELETE://rules/$id": (id: RuleDescId) => RuleDeleted;
}

const url = "/block.html";

const LocalStorage = new LocalStorageApi<{}>({});
const NetRequest = new NetRequestApi();
const BackendComm = new BackendCommApi<REST>();

const rulesService = new RulesServiceImpl(LocalStorage, NetRequest);

BackendComm.addEndpointListener("GET://rules", async function()
{
	return await rulesService.getRules();
});
BackendComm.addEndpointListener("POST://rules", async function(rule: RuleDesc)
{
	return await rulesService.addRule(rule);
});
BackendComm.addEndpointListener("DELETE://rules/$id", async function(id: RuleDescId)
{
	return await rulesService.removeRule(id);
});

/**
 * Everything below is for testing purposes
 */
browser.tabs.create({url: "/settings.html"});











