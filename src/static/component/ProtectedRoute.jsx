import React from "react";
import Redirect from "react-router-dom/es/Redirect";
import {Route} from "react-router-dom";

export default class ProtectedRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthorized: true
        };
        fetch('/api/me')
            .then(response => {
                if (response.status == '200') {
                    this.setState({isAuthorized: true})
                } else {
                    this.setState({isAuthorized: false})
                }
            })
            .catch(() => this.setState({isAuthorized: false}));

    }

    render() {
        switch (this.state.isAuthorized) {
            case false:
                return <Redirect to="/panel/login" from={this.props.path}/>;
            case true:
                return <Route {...this.props}/>
        }
    }

}
