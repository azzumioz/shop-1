import React from "react";
import ReactDOM from "react-dom";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import PanelProductsPage from "./pages/PanelProductsPage.jsx";
import PanelProductPage from "./pages/PanelProductPage.jsx";

import {createBrowserHistory} from "history";

const history = createBrowserHistory();

class App extends React.Component {
    render() {
        return <Router history={history}>
            <Switch>
                <Route exact path="/" component={IndexPage}/>
                <Route exact path="/product/:product" component={ProductPage}/>
                <Route exact path="/product/" component={ProductPage}/>
                <Route exact path="/panel" component={PanelProductsPage}/>
                <Route exact path="/panel/product" component={PanelProductsPage}/>
                <Route exact path="/panel/product/:id" component={PanelProductPage}/>
            </Switch>
        </Router>;
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));
