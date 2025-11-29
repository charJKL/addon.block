import { useParams } from "react-router";

export function Rule()
{
	const params = useParams();
	const rule = "www.rule.pl";
	

	return (
		<section>
			<h1>{rule}</h1>
			<p>{params.ruleId}</p>
		</section>
	)
}