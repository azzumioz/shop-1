import React from "react";
export default class Footer extends React.Component {
    render() {
        return (
            <footer className="container-fluid bg-dark text-white py-3 pl-0">
                <div className="row">
                    <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                        <h6 className="font-weight-bold">&#169; Codery.camp, 2019</h6>
                    </div>
                </div>
            </footer>
        )
    }
}
