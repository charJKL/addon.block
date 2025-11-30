import { LocalStorage } from "browser-extension-std/backend";
import { NetRequest } from "browser-extension-std/backend";
import { ArrayEx, DateEx, hasProp, isNull, isUndefined } from "browser-extension-std/ex";


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

	public constructor(storage: LocalStorage<{}>, netRequest: NetRequest)
	{
		const STORAGE_DEFAULT_VALUE : RulesStorageBlueprint = { rules: [] };

		this.$storage = storage.init(STORAGE_DEFAULT_VALUE);
		this.$netRequest = netRequest;
	}

	public async getRules() : Promise<RuleList>
	{
		return await this.$storage.get("rules");
	}

	public async addRule(ruleDesc: RuleDesc) : Promise<Rule>
	{
		console.log("RuleService", "ruleDesc=", ruleDesc);
		const rules = await this.$storage.get("rules");

		const { simplified, regexp } = this.resolveRuleType(ruleDesc);

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

	private resolveRuleType(rule: RuleDesc) : { simplified: string, regexp: string }
	{
		const SIMPLIFIED_REGEXP = /^(?<protocol>https?:)?(?<www>www\.)?(?<domain>[a-zA-Z0-9_&+-]+(\.[a-zA-Z0-9&_+-]+)+)(?<path>\/[a-zA-Z0-9~!@#$%^&*()\-_=+{};:,.?\\\/]+\/?)?$/
		if(hasProp(rule, "simplified"))
		{
			const result = SIMPLIFIED_REGEXP.exec(rule.simplified);
			if(isNull(result)) throw new Error("Simplified pattern is not supported.");
			if(isUndefined(result.groups)) throw new Error("Simplified patter is not valid.");
			const protocol = result.groups.protocol;
			const www = result.groups.www;
			const domain = result.groups.domain.replaceAll(".", "\.");
			const path = result.groups.path; // TODO trim paths from prefix and suffix
			// TODO builded regexp is not valid!, move it to separate class and unit test it.
			const regexp = `(http|https)://(www)?${domain}/${path}`; // TODO check if user want protocol and www.
			return { simplified: rule.simplified, regexp };
		}
		if(hasProp(rule, "regexp"))
		{
			return { simplified: "", regexp: rule.regexp };
		}
		throw new Error("Unreachable code.");
	}
}