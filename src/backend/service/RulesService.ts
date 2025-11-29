import { LocalStorage } from "browser-extension-std/backend";
import { NetRequest } from "browser-extension-std/backend";


export type UniqueIdString = string;
export type UniqueIdNumber = number;
export type Timestamp = number;
export type Rule = 
{
	id: UniqueIdString;
	netRequestId: UniqueIdNumber;
	addedTime: Timestamp;
	regexp: string;
}
export type RuleList = Array<Rule>;
export type RuleDesc = Pick<Rule, "regexp">;
export type RuleDescId = Pick<Rule, "id"> | Pick<Rule, "netRequestId"> | UniqueIdString;
export type RuleDeleted = { id: null, netRequestId: null }; // TODO base this on Rule type like others 
export type RulesStorageBlueprint = { rules: RuleList };

/**
 * IRulesService 
 */
interface IRulesService
{
	getRules(): RuleList;
	addRule(ruleDesc: RuleDesc) : Promise<Rule>;
	removeRule(ruleDescId: RuleDescId): RuleDeleted;
}

export class RulesService implements IRulesService
{
	private readonly $storage: LocalStorage<RulesStorageBlueprint>;
	private readonly $netRequest: NetRequest;

	public constructor(storage: LocalStorage<{}>, netRequest: NetRequest)
	{
		const storageDefaultValue : RulesStorageBlueprint = { rules: [] };
		this.$storage = storage.init(storageDefaultValue);
		this.$netRequest = netRequest;
	}

	public getRules() : RuleList 
	{
		// TODO query local storage for rules 
		return [];
	}
	
	public async addRule(ruleDesc: RuleDesc) : Promise<Rule>
	{
		const getTimestamp = () => Math.floor(Date.now() / 1000); // TODO move this somewhere
		const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);
		const rules = await this.$storage.get("rules");

		const notRegisteredRule = 
		{
			id: generateId(), // TODO make sure this id is unique in list
			netRequestId: null,
			addedTime: getTimestamp(),
			regexp: ruleDesc.regexp
		}

		const netRequestRuleDesc = { regexp: new RegExp(ruleDesc.regexp) }
		const result = await this.$netRequest.addDynamicRule(netRequestRuleDesc);

		const rule = { ...notRegisteredRule, netRequestId: 23 };
		rules.push(rule);
		const save = await this.$storage.set("rules", rules);
		return rule;
	}

	public removeRule(ruleDescId: RuleDescId ): RuleDeleted
	{
		const rule = { id: null, netRequestId: null, addedTime: 0, regexp: ""}; 
		return rule;
	}
}