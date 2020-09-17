import React from "react";
import {NavLink} from "react-router-dom";

export default class Navigation extends React.Component {

    render() {
        return (
            <div className={this.props.clName}>
                {this.props.tabs.map(function (item, index) {
                    return (
                        <NavLink exact key={index} className="nav-link nav-item pl-0" to={item.link}>{item.name}</NavLink>
                    )
                })}
            </div>
        )
    }
}
