import { useState, MouseEvent } from 'react';
import css from "./settings.scss";

export function App()
{
	const [click, setClick] = useState(0);

	const onClick = function()
	{
		browser.runtime.sendMessage({messageId: "get/blocked/list", id:23});
		setClick(click + 1);
	}


	const menuOnClick = function(e: MouseEvent<HTMLAnchorElement>)
	{
		e.preventDefault();
	}

	return (
		<>
			<header className={css.header}>
				<nav className={css.nav}>
					<a href="/rules" className={css.active} onClick={menuOnClick}>Rules</a>
					<a href="/export" onClick={menuOnClick}>Export</a>
					<a href="/settings" className={css.navSettings} onClick={menuOnClick}>Settings</a>
				</nav>
			</header>
			<main className={css.main}>
				Main Page
			</main>
		</>
	);
}