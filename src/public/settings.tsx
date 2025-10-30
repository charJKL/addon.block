import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import { App } from "./App";

const root = createRoot(document.getElementById('root') as HTMLElement);
	  root.render(<BrowserRouter><App/></BrowserRouter>);