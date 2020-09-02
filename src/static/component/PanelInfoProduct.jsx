import React from "react";
import PanelInfo from "./PanelInfo.jsx";

export default class PanelInfoProduct extends React.Component {

    render() {
        switch (this.props.status) {
            case 'pending':
                return (
                    <PanelInfo typeAlert="alert-warning" textAlert="Выполняется загрузка данных"/>
                );
                break;
            case 'idle':
                return (
                    <PanelInfo typeAlert="alert-primary" textAlert="Ожидание действий"/>
                );
                break;
            case 'ready':
                return (
                    <PanelInfo typeAlert="alert-success" textAlert="Данные загружены"/>
                );
                break;
            default:
                return (
                    <PanelInfo typeAlert="alert-danger" textAlert="Ошибка"/>
                );
        }
    }

}
