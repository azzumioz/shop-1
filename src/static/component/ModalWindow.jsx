import Portal from "./Portal.jsx";
import React from "react";

export default class ModalWindow extends React.Component {

    render() {
        return (
            <Portal>
                <div className="modalOverlay">
                    <div className="modalWindow">
                        <div className="modalHeader">
                            <div className="modalTitle">Подтвердите удаление товара</div>
                        </div>
                        <div className="modalBody">
                            Наименование: {this.props.title}
                        </div>
                        <div className="modalFooter">
                            <button onClick={this.props.onButtonCancel}
                                    className="m-2 btn btn-success font-weight-bold">Отмена
                            </button>
                            <button onClick={this.props.onButtonConfirm}
                                    className="m-2 btn btn-danger font-weight-bold">Удалить
                            </button>
                        </div>
                    </div>
                </div>
            </Portal>
        )
    }

}
