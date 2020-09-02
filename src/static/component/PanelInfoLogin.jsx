import React from "react";
import PanelInfo from "./PanelInfo.jsx";

export default class PanelInfoLogin extends React.Component {

    render() {
        switch (this.props.status) {
            case 'pending':
                return (
                    <PanelInfo typeAlert="alert-warning" textAlert="Проверка авторизации"/>
                );
                break;
            case 'idle':
                return (
                    <PanelInfo typeAlert="alert-primary" textAlert="Ожидание регистрации"/>
                );
                break;
            case 'logged':
                return (
                    <PanelInfo typeAlert="alert-success" textAlert="Регистрация выполнена успешна"/>
                );
                break;
            default:
                return (
                    <PanelInfo typeAlert="alert-danger" textAlert="Ошибка авторизации"/>
                );
        }
    }

}
