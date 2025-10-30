import { Routes, Route, NavLink } from "react-router";
import css from "./settings.module.scss";

import { Rules } from "./components/Rules";
import { Export } from "./components/Export";
import { Settings } from "./components/Settings";

export function App()
{
	return (
		<>
			<header className={css.header}>
				<nav className={css.nav}>
					<NavLink to="rules" relative="path" className={({ isActive }) => isActive ? css.active : ""}>Rules</NavLink>
					<NavLink to="export" relative="path">Exports</NavLink>
					<NavLink to="settings" relative="path" className={css.navSettings} >Settings</NavLink>
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