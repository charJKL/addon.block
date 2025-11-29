import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";
import { Provider } from "react-redux";

import { Store } from "@/frontend/store/Store";
import { App } from "./App";



const root = createRoot(document.getElementById('root') as HTMLElement);
	root.render(
		<React.StrictMode>
			<Provider store={Store}>
				<HashRouter>
					<App/>
				</HashRouter>
			</Provider>
		</React.StrictMode>
	);