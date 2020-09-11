import React from "react";

export default class PanelInfo extends React.Component {

    render() {
        return (
            <div className={this.props.typeAlert} role="alert">
                <div className="pl-2">
                    {this.props.textAlert}
                </div>
            </div>
        );
    }

}
