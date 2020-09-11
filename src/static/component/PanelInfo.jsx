import React from "react";

export default class PanelInfo extends React.Component {

    render() {
        return (
            <div className={this.props.typeAlert} role="alert">
                <div className="px-2">
                    {this.props.textAlert}
                </div>
            </div>
        );
    }

}
