import type { RuleDesc } from "../RulesService";
import { hasProp, isNull, isUndefined } from "browser-extension-std/ex";

export interface IRuleDescStrategy
{
	buildRuleDesc(ruleDesc: RuleDesc): { regexp: string, simplified: string };
}

export class BasicRuleDescStrategy implements IRuleDescStrategy
{
	public buildRuleDesc(ruleDesc: RuleDesc): { regexp: string; simplified: string; } 
	{
		const SIMPLIFIED_REGEXP = /^(?<protocol>https?:)?(?<www>www\.)?(?<domain>[a-zA-Z0-9_&+-]+(\.[a-zA-Z0-9&_+-]+)+)(?<path>\/[a-zA-Z0-9~!@#$%^&*()\-_=+{};:,.?\\\/]+\/?)?$/
		if(hasProp(ruleDesc, "simplified"))
		{
			const result = SIMPLIFIED_REGEXP.exec(ruleDesc.simplified);
			if(isNull(result)) throw new Error("Simplified pattern is not supported.");
			if(isUndefined(result.groups)) throw new Error("Simplified patter is not valid.");
			const protocol = result.groups.protocol;
			const www = result.groups.www;
			const domain = result.groups.domain.replaceAll(".", "\.");
			const path = result.groups.path; // TODO trim paths from prefix and suffix
			// TODO builded regexp is not valid!, move it to separate class and unit test it.
			const regexp = `(http|https)://(www)?${domain}/${path}`; // TODO check if user want protocol and www.
			return { simplified: ruleDesc.simplified, regexp };
		}
		if(hasProp(ruleDesc, "regexp"))
		{
			return { simplified: "", regexp: ruleDesc.regexp };
		}
		throw new Error("Unreachable code.");
	}
}