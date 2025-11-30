import React, { useRef } from "react";
import { useAppDispatch } from "@/frontend/store/hooks";
import { addRule } from "@/frontend/store/rulesSlice";

export function AddNewRule()
{
	const dispatch = useAppDispatch();
	const ref = useRef<HTMLInputElement>(null); // TODO for testing only

	const onSubmitForm = (e: React.FormEvent) =>
	{
		e.preventDefault();
		const regexp = ref.current?.value;
		if(regexp == null) return;

		const rule = { simplified: regexp };
		dispatch(addRule(rule));
	}

	return (
		<section>
			<h2>Add new rule</h2>
			<form onSubmit={onSubmitForm}>
				<input ref={ref} type="text" id="ruleRegexp" required />
				<input type="submit" value="Add rule" />
			</form>
		</section>
	);
}
