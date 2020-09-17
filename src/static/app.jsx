import React from "react";
import ReactDOM from "react-dom";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import IndexPage from "./pages/IndexPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import PanelProductsPage from "./pages/PanelProductsPage.jsx";
import PanelProductPage from "./pages/PanelProductPage.jsx";
import PanelLoginPage from "./pages/PanelLoginPage.jsx";
import ProtectedRoute from "./component/ProtectedRoute.jsx";
import DeliveryPage from "./pages/DeliveryPage.jsx";
import GuaranteePage from "./pages/GuaranteePage.jsx";
import ContactsPage from "./pages/ContactsPage.jsx";

const history = createBrowserHistory();

class App extends React.Component {
    render() {
        return <Router history={history}>
            <Switch>
                <Route exact path="/" component={IndexPage}/>
                <Route exact path="/delivery" component={DeliveryPage}/>
                <Route exact path="/guarantee" component={GuaranteePage}/>
                <Route exact path="/contacts" component={ContactsPage}/>
                <ProtectedRoute exact path="/product/:product" component={ProductPage}/>
                <ProtectedRoute exact path="/product/" component={ProductPage}/>
                <ProtectedRoute exact path="/panel" component={PanelProductsPage}/>
                <ProtectedRoute exact path="/panel/product" component={PanelProductsPage}/>
                <ProtectedRoute exact path="/panel/product/:id" component={PanelProductPage}/>
                <Route exact path="/panel/login" component={PanelLoginPage}/>
            </Switch>
        </Router>;
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));
