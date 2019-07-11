import React from 'react';
import './App.css';
import Friends from './Friends';
import 'bootstrap/dist/css/bootstrap.css';
import Server from './Server';

const initState = {
    user: undefined,
    isLogon: false,
    accessToken: ''
}

const homePage = 'https://gagarinbefree.github.io/webimvk'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    render() {
        return <div className="App">
            {this.state.isLogon ? (
                <React.Fragment>
                    <nav className="navbar navbar-dark bg-primary">
                        <div className="navbar-brand">
                            <img src={this.state.user.photo_50} width="30" height="30" className="d-inline-block align-top rounded-circle" alt=""></img>
                            <strong className="ml-3">{this.state.user.first_name + " " + this.state.user.last_name}</strong>
                        </div>
                        <div className="navbar-right cursor-pointer" onClick={() => this.logout()}>
                            <span className="font-weight-light text-light">Выход</span>
                        </div>
                    </nav>
                    <div className="d-flex align-items-center justify-content-center h-100 mt-3">
                        <div className="d-flex flex-column">
                            <Friends userId={this.state.user.id} accessToken={this.state.accessToken} logout={() => this.logout} />
                        </div>
                    </div>
                </React.Fragment>) : (
                    <div className="d-flex align-items-center justify-content-center h-100 mt-3">
                        <div className="d-flex flex-column">
                            <div className="row mt-3">
                                <button type="button" className="btn btn-success" onClick={async () => await this.login()}>
                                    Войти через ВКонтакте
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    }

    logout() {        
        localStorage.clear();
        this.setState(initState);
    }

    
    getQueryString(field, url) {
        var href = url;
        var reg = new RegExp( '[#&]' + field + '=([^&#]*)', 'i' );
        var string = reg.exec(href);
        return string ? string[1] : null;
    };

    async componentDidMount() {
        await this.login();
    }

    async login() {
        let token = this.getQueryString('access_token', document.location.hash);
        let userId = this.getQueryString('user_id', document.location.hash);

        if (token && userId) {
            localStorage.setItem('access_token', token);
            localStorage.setItem('user_id', userId);

            window.location.href=homePage;
        }

        token = localStorage.getItem('access_token');
        userId = localStorage.getItem('user_id');

        if(token && userId) {
            let res = await Server.usersGet(userId, token);
            if (res && res.length > 0) {
                this.setState( {
                    user: res[0],
                    isLogon: true,
                    accessToken: token
                });       
            }
            else 
                this.logout();
        }
        else 
            window.location.href = 'https://oauth.vk.com/authorize?client_id=7047531&display=page&redirect_uri=' + homePage + '&response_type=token&revoke=1';
    }

}

export default App;
