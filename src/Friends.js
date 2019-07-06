import React from 'react';
import Friend from './Friend';

class Friends extends React.Component {
    constructor(props) {
        super(props);

        this.state = {userId: props.userId, friends: []}
    }

    render() {
        return <React.Fragment>
            {this.state.friends.map((item, index) => {
                    return <Friend key={item.id} id={item.id} firstName={item.first_name} lastName={item.last_name} online={item.online} />
                })
            }
        </React.Fragment>
    }    

    componentDidMount() {
        this.getFriends();
    }

    getFriends() {        
        VK.api("friends.get", {"user_id": this.state.userId, "fields": "first_name,lastname", "count": 5, "v":"5.101"}, (data) => { // eslint-disable-line no-undef
            this.setState({friends: data.response.items});
        });
    }
}

export default Friends;