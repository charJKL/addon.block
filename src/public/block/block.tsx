import { createRoot } from "react-dom/client";
import "./block.module.scss";

const root = createRoot(document.getElementById('root') as HTMLElement);
	  root.render(<App/>);

export function App()
{
	return (
		<div>
			Ta strona jest zablokowana
		</div>
	)
}