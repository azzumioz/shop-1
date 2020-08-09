import React from "react";
import ProductPage from "./pages/ProductPage.jsx";
import ReactDOM from "react-dom";

class App extends React.Component {
    render() {
        return <ProductPage></ProductPage>;
    }
}

const instance =
    <App></App>
;
ReactDOM.render(instance, document.getElementById("root"));
