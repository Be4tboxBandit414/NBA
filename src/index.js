import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import { Provider } from "react-redux";
import App from "./components/Main";
import GlobalStyle from "./styles/index"


ReactDOM.render(
	<>
		<Provider store={store}>
			<GlobalStyle />
			<App />
		</Provider>
	</>, document.getElementById('root'));