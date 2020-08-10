import React from "react";
export default class Navigation extends React.Component {


    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            activeIndex: 0
        };
    }

    onClick(e) {
        this.setState({activeIndex: parseInt(e.currentTarget.getAttribute("data-index"))});
    }

    render() {
        const {onClick} = this;
        const {activeIndex} = this.state;
        return (
            <div className={this.props.clName}>
                {this.props.tabs.map(function (item, index) {
                    var isActive = index === activeIndex;
                    return (
                        <a key={item} className={isActive ? "active nav-link nav-item" : "nav-link nav-item"}
                           onClick={onClick} data-index={index} href="#">{item}</a>
                    )
                })}
            </div>
        )
    }

}
