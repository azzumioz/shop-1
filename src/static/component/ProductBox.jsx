import React from "react";
import {Link} from "react-router-dom";

export default class ProductBox extends React.Component {
    render() {
        const product = this.props.product;

        return (
            <div className="card" key={product.key}>
                <Link to={`/product/${product.key}-${product.slug}`}>
                    <img className="card-img-top" src={`${product.img}`}/>
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <p>Цена: <b>{product.price} руб.</b></p>
                    <Link to={`/product/${product.key}-${product.slug}`}>
                        <a href="#" className="btn btn-primary font-weight-bold">Заказать</a>
                    </Link>
                </div>
            </div>
        )
    }
}
