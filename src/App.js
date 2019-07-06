import React from 'react';
import './App.css';
import Friends from './Friends';
import 'bootstrap/dist/css/bootstrap.css';

const initState = {
    user: undefined,
    photo: "",
    isLogon: false
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    render() {
        return <div className="App">
            {this.state.isLogon ? (
                <React.Fragment>
                    <nav class="navbar navbar-dark bg-primary">
                        <a class="navbar-brand" href="" onClick={() => this.logout()}>
                            <img className="rounded-circle" src={this.state.photo} width="30" height="30" class="d-inline-block align-top rounded-circle" alt=""></img>
                            <strong className="ml-3">{this.state.user.first_name + " " + this.state.user.last_name}</strong>
                        </a>
                    </nav>
                    <div className="d-flex align-items-center justify-content-center h-100 mt-3">
                        <div className="d-flex flex-column">
                            <Friends userId={this.state.user.id} />
                        </div>
                    </div>
                </React.Fragment>) : (
                    <div className="d-flex align-items-center justify-content-center h-100 mt-3">
                        <div className="d-flex flex-column">
                            <div className="row mt-3">
                                <button type="button" class="btn btn-success" onClick={() => this.login()}>
                                    Войти через ВКонтакте
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    }

    logout() {
        VK.Auth.logout(() => { // eslint-disable-line no-undef
            this.setState({ user: undefined, isLogon: false });
        });
    }

    componentDidMount() {
      this.login();
    }

    login() {
        VK.Auth.login((r) => { // eslint-disable-line no-undef      
            if (r.session) {
                VK.api("users.get", { "user_ids": r.session.user.id, fields: "photo_50", "v": "5.101" }, (p) => { // eslint-disable-line no-undef
                    this.setState({
                        user: r.session.user,
                        photo: p.response[0].photo_50,
                        isLogon: true
                    });
                });
            }
            else {
                this.setState(initState);
            }
        });
    }
}

export default App;
