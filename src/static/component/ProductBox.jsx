import React from "react";
import {Link} from "react-router-dom";

export default class ProductBox extends React.Component {
    render() {
        const product = this.props.product;

        return (
            <div className="card">
                <Link to={this.props.linkProduct}>
                    <img className="card-img-top" src={`data: ${product.fileType} ;base64, ${product.file}`}/>
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <p>Цена: <b>{product.price} руб.</b></p>
                    <Link to={this.props.linkProduct}>
                        <div className="btn btn-primary font-weight-bold">{this.props.textButton}</div>
                    </Link>
                </div>
            </div>
        )
    }
}
