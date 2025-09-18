import { useState } from 'react';

export function App()
{
	const [click, setClick] = useState(0);

	const onClick = function()
	{
		setClick(click + 1);
	}

	return (
		<main>
			<header>Main | Other</header>
			<h1>WELCOME TO REACT </h1>
			<button onClick={onClick}>Click {click}</button>
		</main>
	);
}