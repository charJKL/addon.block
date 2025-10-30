import { useState, MouseEvent } from 'react';
import { Routes, Route, NavLink } from "react-router";

import css from "./settings.module.scss";


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
					<NavLink to="rules" relative="path" className={({ isActive }) => isActive ? css.active : ""}>Rules</NavLink>
					<NavLink to="export" relative="path">Exports</NavLink>
					<NavLink to="settings" relative="path" className={css.navSettings} >Settings</NavLink>
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