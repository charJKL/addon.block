import { useState } from 'react';
import css from "./settings.scss";

export function App()
{
	const [click, setClick] = useState(0);

	const onClick = function()
	{
		browser.runtime.sendMessage({messageId: "get/blocked/list", id:23});
		setClick(click + 1);
	}

	return (
		<main>
			<header className={css.header}>Main | Other</header>
			<h1>WELCOME TO REACT </h1>
			<button className={css.noname} onClick={onClick}>Click {click}</button>
		</main>
	);
}