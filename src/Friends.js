import React from 'react';
import Friend from './Friend';
import Server from './Server';

class Friends extends React.Component {
    constructor(props) {
        super(props);

        this.state = {friends: []}
    }

    render() {
        return <React.Fragment>
            {this.state.friends.map((item, index) => {
                    return <Friend key={item.id} id={item.id} firstName={item.first_name} lastName={item.last_name} online={item.online} photo={item.photo_50} />
                })
            }
        </React.Fragment>
    }    

    async componentDidMount() {
        await this.getFriends();
    }

    async getFriends() {    
        var res = await Server.friendsGet(this.props.userId, this.props.accessToken, 5);
        if (!res)
            this.props.logout();

        this.setState({friends: res.items});
    }
}

export default Friends;