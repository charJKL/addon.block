import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import { App } from "./App";

const root = createRoot(document.getElementById('app') as HTMLElement);
	  root.render(<BrowserRouter><App/></BrowserRouter>);