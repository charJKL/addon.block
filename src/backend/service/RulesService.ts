import { LocalStorage } from "browser-extension-std/backend";
import { NetRequest } from "browser-extension-std/backend";
import { ArrayEx, DateEx, isUndefined } from "browser-extension-std/ex";
import { type IRuleDescStrategy, BasicRuleDescStrategy } from "./sub/BasicRuleDescStrategy";

export type UniqueIdString = string;
export type UniqueIdNumber = number;
export type Timestamp = number;
export type Rule = 
{
	id: UniqueIdString;
	netRequestId: UniqueIdNumber;
	time: Timestamp;
	simplified?: string;
	regexp?: string;
}
export type RuleList = Array<Rule>;
export type RuleDesc = { simplified: string } | { regexp: string };
export type RuleDescId = {id: UniqueIdString , netRequestId?: UniqueIdNumber } | {id?: UniqueIdString , netRequestId: UniqueIdNumber } 
type MakeNullable<T, U extends keyof T> = { [Key in keyof T]: Key extends U ? T[Key] | null : T[Key]; } // TODO move this to some file
export type RuleDeleted = MakeNullable<Rule, "id" | "netRequestId">
export type RulesStorageBlueprint = { rules: RuleList };

/**
 * IRulesService 
 */
interface IRulesService
{
	getRules(): Promise<RuleList>;
	addRule(ruleDesc: RuleDesc) : Promise<Rule>;
	removeRule(ruleIdDesc: RuleDescId): Promise<RuleDeleted>;
}

export class RulesService implements IRulesService
{
	private readonly $storage: LocalStorage<RulesStorageBlueprint>;
	private readonly $netRequest: NetRequest;
	private readonly $ruleDesc: IRuleDescStrategy;

	public constructor(storage: LocalStorage<{}>, netRequest: NetRequest)
	{
		const STORAGE_DEFAULT_VALUE : RulesStorageBlueprint = { rules: [] };

		this.$storage = storage.init(STORAGE_DEFAULT_VALUE);
		this.$netRequest = netRequest;
		this.$ruleDesc = new BasicRuleDescStrategy();
	}

	public async getRules() : Promise<RuleList>
	{
		return await this.$storage.get("rules");
	}

	public async addRule(ruleDesc: RuleDesc) : Promise<Rule>
	{
		console.log("RuleService", "ruleDesc=", ruleDesc);
		const rules = await this.$storage.get("rules");

		const { simplified, regexp } = this.$ruleDesc.buildRuleDesc(ruleDesc);

		const notRegisteredRule = 
		{
			id: this.generateUniqueId(rules),
			netRequestId: null,
			time: DateEx.getTimestamp(),
			simplified,
			regexp,
		}

		const netRequestRuleDesc = { regexp: new RegExp(regexp) }
		const result = await this.$netRequest.addDynamicRule(netRequestRuleDesc);
		const rule = { ...notRegisteredRule, netRequestId: result.id };
		const save = await this.$storage.set("rules", [...rules, rule]);
		console.log("RuleSevice", [...rules, rule]);
		return rule;
	}

	public async removeRule(ruleIdDesc: RuleDescId ): Promise<RuleDeleted>
	{
		const rules = await this.$storage.get("rules");

		const id = ruleIdDesc.id ?? null;
		const netRequestId = ruleIdDesc.netRequestId ?? null;

		const findRuleByIdOrRequestId = (rule: Rule) => rule.id === id || rule.netRequestId === netRequestId;
		const rule = rules.find(findRuleByIdOrRequestId);
		if(isUndefined(rule)) throw new Error("Rule you want to delete doesnt exist");

		const netRequestRuleIdDesc = { id: rule.netRequestId };
		const result = await this.$netRequest.removeDynamicRule(netRequestRuleIdDesc);

		const newRules = ArrayEx.remove(rules, rule);
		const save = await this.$storage.set("rules", newRules);

		const removed = { ...rule, id: null, netRequestId: null };
		return removed;
	}

	private generateUniqueId(list: RuleList) : string
	{
		console.log(list);
		const getRandomId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);
		let id = getRandomId();
		while(list.find((rule) => rule.id === id)) {id = getRandomId(); console.log(id);}
		return id;
	}
}