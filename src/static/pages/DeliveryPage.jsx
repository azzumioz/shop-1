import React from "react";
import CommonPage from "./CommonPage.jsx";

export default class DeliveryPage extends React.Component {

    render() {
        return (
            <CommonPage
                title="Доставка"
                text="Условия доставки..."
                textButton="Заказать доставку"
            />
        );
    };

}
