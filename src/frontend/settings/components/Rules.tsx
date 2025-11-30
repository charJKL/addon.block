import { useEffect } from "react"
import { useAppSelector, useAppDispatch  } from "@/frontend/store/hooks"; // TODO make alias for this folder
import { getRules, Status } from "@/frontend/store/rulesSlice";

import { RuleRow } from "./rules/RuleRow";
import { AddNewRule } from "./rules/AddNewRule";

export function Rules()
{
	const list = useAppSelector(state => state.rules.list);
	const status = useAppSelector(state => state.rules.get.status);
	
	const dispatch = useAppDispatch();
	useEffect(() => 
	{
		if(status === Status.Idle ) dispatch(getRules());
	}, [status, dispatch]);

	return (
		<>
			<AddNewRule />
			<section>
				{ list.map(r => <RuleRow key={r.id} rule={r}/>) }
			</section>
		</>
	)
}
