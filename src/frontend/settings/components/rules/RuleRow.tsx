import { NavLink } from "react-router";
import { useAppDispatch } from "@/frontend/store/hooks";
import type { Rule } from "@/frontend/store/rulesSlice";
import { removeRule } from "@/frontend/store/rulesSlice";
import css from "./RuleRow.module.scss";


interface RuleRowProps
{
	rule: Rule;
}

export function RuleRow({rule}: RuleRowProps)
{
	const dispatch = useAppDispatch();
	const to = `/rule/${rule.id}`;

	const onClickDelete = () =>
	{
		dispatch(removeRule(rule));
	}

	return (
		<div className={css.RuleRow}>
			<div className={css.Id} >{rule.id}</div>
			<div className={css.NetRequestId} >{rule.netRequestId}</div>
			<div className={css.Name}>
				<div><NavLink to={to} >{rule.simplified}</NavLink></div>
				<div>{rule.regexp}</div>
			</div>
			<div className={css.Time}>{rule.time}</div>
			<div className={css.Actions}>
				<button onClick={onClickDelete}>Delete</button>
			</div>
		</div>
	)
}
