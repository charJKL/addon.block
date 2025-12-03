import type { RuleDesc } from "../RulesService";
import { RegExpEx, hasProp, isNull, isUndefined } from "browser-extension-std/ex";
export interface IRuleDescStrategy
{
	buildRuleDesc(ruleDesc: RuleDesc): { regexp: string, simplified: string };
}

export class BasicRuleDescStrategy implements IRuleDescStrategy
{
	public buildRuleDesc(ruleDesc: RuleDesc): { regexp: string; simplified: string; } 
	{
		const SIMPLIFIED_REGEXP = /^(?<protocol>https?:)?(\/\/)?(?<www>www\.)?(?<domain>[a-zA-Z0-9_&+-]+(\.[a-zA-Z0-9&_+-]+)+)(?<path>\/?[a-zA-Z0-9~!@#$%^&*()\-_=+{};:,.?\\\/]+\/?)?$/
		if(hasProp(ruleDesc, "simplified"))
		{
			const result= RegExpEx.exec(SIMPLIFIED_REGEXP, ruleDesc.simplified);
			if(isNull(result)) throw new Error("Simplified pattern is not supported.");
			if(isUndefined(result.groups)) throw new Error("Simplified patter is not valid.");
			if(isUndefined(result.groups.domain)) throw new Error("Simplified pattern is wrong");
			const protocol = result.groups.protocol ?? "(http|https):";
			const www = result.groups.www?.replaceAll(".", "\\.") ?? "(www\\.)?" ;
			const domain = result.groups.domain.replaceAll(".", "\\.");
			const path = result.groups.path?.replaceAll(".", "\\.").replaceAll("?", "\\?").replaceAll("*", ".*") ?? "";

			const regexp = `${protocol}//${www}${domain}${path}`;
			return { simplified: ruleDesc.simplified, regexp };
		}
		if(hasProp(ruleDesc, "regexp"))
		{
			return { simplified: "", regexp: ruleDesc.regexp };
		}
		throw new Error("Unreachable code.");
	}
}