import { LocalStorage as LocalStorageApi } from "browser-extension-std/backend";
import { NetRequest as NetRequestApi } from "browser-extension-std/backend";
import { BackendComm as BackendCommApi } from "browser-extension-std/backend";

import { RulesService as RulesServiceImpl} from "./service/RulesService";

import type { Rule, RuleList, RuleDescId } from "./service/RulesService";


export type REST = 
{
	"GET://rules": () => RuleList;
	"GET://rules/$id": (id: RuleDescId) => Rule;
}


const url = "./public/block.html";

const LocalStorage = new LocalStorageApi<{}>({});
const NetRequest = new NetRequestApi(url);
const BackendComm = new BackendCommApi<REST>();


const rulesService = new RulesServiceImpl(LocalStorage, NetRequest);

BackendComm.addEndpointListener("GET://rules", function()
{
	console.log("Addon.block.ts::GET://rules");
	return [];
});

BackendComm.addEndpointListener("GET://rules/$id", function(id: RuleDescId)
{
	console.log("Addon.block.ts::GET://rules/$id");
	return {id: "asdsad", netRequestId: 23, addedTime: 234, regexp: "/asdasd/"};
})


/**
 * Everything below is for testing purposes
 */

const blockPagePath = browser.runtime.getURL("./block.html");
console.log(blockPagePath);
type NetRequestRule = browser.declarativeNetRequest.Rule;
const ruleAction = { type: "redirect", redirect: { extensionPath: "/block.html" } };
//const ruleAction = { type: "redirect", redirect: { url: "https://stackoverflow.com/" } };

const ruleCondition = {urlFilter: "||pomofocus",  resourceTypes: ["main_frame", "sub_frame"] };
const rule : NetRequestRule = {id: 1, condition: ruleCondition, action: ruleAction };
const addRules : NetRequestRule[] = [rule];
const removeRuleIds = [1];
let rulesUpdated = browser.declarativeNetRequest.updateDynamicRules({addRules, removeRuleIds});

console.log(rulesUpdated);
browser.tabs.create({url: "/settings.html"});


browser.declarativeNetRequest.getDynamicRules().then(rules => console.log(rules));










