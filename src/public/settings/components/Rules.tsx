import { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch  } from "../store/hooks"; // TODO make alias for this folder
import { updateList } from "../store//rulesSlice";

export function Rules()
{
	const list = useAppSelector(state => state.rules.list);
	const dispatch = useAppDispatch();

	const addNewRuleHandler = function()
	{
		dispatch(updateList({name: "newRule", isActive: true}));

		const message = { endpoint: "POST://rules/$id", data: {regepx: "/^asdasd"} };
		const onMessage = function(msg: unknown) {
			console.log("Response recived from background script", msg);
		}
		const onError = function(e: unknown)
		{
			console.error("Error during reciving response from background script", e);
		}
 		browser.runtime.sendMessage(message).then(onMessage).catch(onError);
	}

	const domList = list.map(r => <RuleRow rule={r}/>);
	return (
		<>
			<section>
				<div>
					<input type="text" />
					<input type="button" value="Add rule" onClick={addNewRuleHandler}/>
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
	return (<div>{rule.name}</div>);
}
