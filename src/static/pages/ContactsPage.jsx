import React from "react";
import CommonPage from "./CommonPage.jsx";

export default class ContactsPage extends React.Component {

    render() {
        return (
            <CommonPage
                title="Контакты"
                text="Наши контакты..."
                textButton="Связаться с нами"
            />
        );
    };

}
