import React from "react";
import {Link} from "react-router-dom";

export default class PanelProductBox extends React.Component {
    render() {
        const product = this.props.product;

        return (
                <div className="card" key={product.key}>
                    <Link to={`/panel/product/${product._id}`}>
                        <img className="card-img-top" src={`/${product.img}`}/>
                    </Link>
                    <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.description}</p>
                        <p>Цена: <b>{product.price} руб.</b></p>
                        <a href={`/panel/product/${product._id}`} className="btn btn-primary font-weight-bold">Перейти к товару</a>
                    </div>
                </div>
            )
    }
}
