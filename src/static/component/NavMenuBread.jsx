import React from "react";

export default class NavMenuBread extends React.Component {

    render() {
        return (
            <ol className="breadcrumb">
                {this.props.tabs.map(function (item, index) {
                    return <li key={index} className="breadcrumb-item"><a href={item.link}>{item.name}</a></li>
                })}
            </ol>
        )
    }

}
