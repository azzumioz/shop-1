import React from "react";

export default class ProductBox extends React.Component {
    render() {
        return <div className="product">
            <h1>{ this.props.title }</h1>
            { this.props.children }
        </div>;
    }
}
