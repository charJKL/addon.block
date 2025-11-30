import { useEffect, useRef } from "react"
import { NavLink } from "react-router";
import { useAppSelector, useAppDispatch  } from "@/frontend/store/hooks"; // TODO make alias for this folder
import { getRules, addRule, Status } from "@/frontend/store/rulesSlice";
import type { Rule } from "@/frontend/store/rulesSlice";

// import type { Rule } from "@/frontend/store/slice"
// impoty type { Rule } from "@/store/slice"


export function Rules()
{
	const list = useAppSelector(state => state.rules.list);
	const status = useAppSelector(state => state.rules.get.status);
	const dispatch = useAppDispatch();
	useEffect(() => 
	{
		if(status === Status.Idle ) dispatch(getRules());
	}, [status, dispatch]);

	const ref = useRef<HTMLInputElement>(null); // TODO for testing only
	const onSubmitHandler = function(e: React.FormEvent)
	{
		e.preventDefault();
		const regexp = ref.current?.value;
		if(regexp == null) return;

		const rule = { simplified: regexp };
		dispatch(addRule(rule));
	}

	const domList = list.map(r => <RuleRow key={r.id} rule={r}/>);
	return (
		<>
			<section>
				<div>
					<h2>Add new rule</h2>
					<form onSubmit={onSubmitHandler}>
						<input ref={ref} type="text" id="ruleRegexp" required />
						<input type="submit" value="Add rule" />
					</form>
				</div>
			</section>
			<section>
				{ domList }
			</section>
		</>
	)
}

interface RuleRowProps
{
	rule: Rule;
}

function RuleRow({rule}: RuleRowProps)
{
	const path = `/rule/${rule.id}`;
	return (<div><NavLink to={path} relative="path">{rule.regexp}</NavLink></div>);
}
