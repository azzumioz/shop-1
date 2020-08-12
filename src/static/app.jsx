import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";



import { createBrowserHistory } from "history";
const history = createBrowserHistory();

class App extends React.Component {
    render() {
        return <Router history={ history }>
            <Switch>
                <Route exact path="/" component={ IndexPage } />
                <Route exact path="/product/:product" component={ ProductPage } />
            </Switch>
        </Router>;
    }
}

const instance = <App></App>;
ReactDOM.render(instance, document.getElementById("root"));
