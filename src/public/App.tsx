import { useState, MouseEvent } from 'react';
import { Routes, Route } from "react-router";
import { RelativeNavLink } from "./components/RelativeNavLink";

import css from "./settings.scss";


import { Rules } from "./components/Rules";
import { Export } from "./components/Export";
import { Settings } from "./components/Settings";

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
					<RelativeNavLink to="/rules" relative="path"className={({ isActive }) => isActive ? css.active : ""}>Rules</RelativeNavLink>
					<RelativeNavLink to="/export" relative="path">Exports</RelativeNavLink>
					<RelativeNavLink to="/settings" relative="path" className={css.navSettings} >Settings</RelativeNavLink>
					{/*
					<a href="/rules" className={css.active} onClick={menuOnClick}>Rules</a>
					<a href="/export" onClick={menuOnClick}>Export</a>
					<a href="/settings" className={css.navSettings} onClick={menuOnClick}>Settings</a>
					*/}
				</nav>
			</header>
			<main className={css.main}>
				<Routes>
					<Route path="/rules" index element={<Rules />} />
					<Route path="/export" element={<Export />} />	
					<Route path="/settings" element={<Settings />} />
				</Routes>
			</main>
		</>
	);
}