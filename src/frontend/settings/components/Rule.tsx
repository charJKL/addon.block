import { useParams } from "react-router";
import { useAppSelector } from "@/frontend/store/hooks";
import { selectRuleById } from "@/frontend/store/rulesSlice";
import { isNull } from "browser-extension-std/ex";

export function Rule()
{
	const params = useParams<{ id?: string }>();

	const ruleId = params.id ?? "";
	const rule = useAppSelector(selectRuleById(ruleId));
	
	if(isNull(rule)) return <section>Rule doesn't exist</section>;
	return (
		<section>
			<h1>{rule.simplified}</h1>
			<div>Id: {rule.id}</div>
			<div>NetRequestId: {rule.netRequestId}</div>
			
			<div>Regexp: {rule.regexp}</div>
			<div>Time: {rule.time}</div>
		</section>
	)
}