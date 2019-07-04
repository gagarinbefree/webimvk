import React from 'react';

class Friend extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id, 
            lastName: props.lastName, 
            firstName: props.firstName,
            photo: "",
            online: props.online
        }
    }

    componentDidMount() {
        this.getFoto();
    }

    getFoto() {
        VK.api("users.get", {"user_ids": this.state.id, fields: "photo_50", "v":"5.101"}, (p) => { // eslint-disable-line no-undef
            this.setState({ 
                photo: p.response[0].photo_50,
            });
        });
    }

    render() {
        return <div className="row mt-3">
            <img src={this.state.photo} width="30" height="30" className="d-inline-block align-top rounded-circle" alt="" />
            <span className="ml-3">{this.state.firstName + " " + this.state.lastName}</span>
            {this.state.online == 1 ? <span className="ml-3 text-success">online</span> : null}
        </div>
    }
}

export default Friend;