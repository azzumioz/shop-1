import React from "react";

export default class NavMenuBread extends React.Component {

    render() {
        return (
            <ol className="breadcrumb">
                {this.props.tabs.map(function (item) {
                    return <li className="breadcrumb-item"><a href={item.link}>{item.name}</a></li>
                })}
            </ol>
        )
    }

}
