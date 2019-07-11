import jQuery from "jquery";

class Server {
    static async usersGet(userId, accessToken) {
        let url = `https://api.vk.com/method/users.get?user_ids=${userId}&fields=photo_50&access_token=${accessToken}&v=5.101`;  

        try {
            var data = await jQuery.ajax({
                url : url,
                type : "GET",
                dataType : "jsonp"
            });

            return data.response;
        }
        catch(e) {
            return null;            
        }
    }

    static async friendsGet(userId, accessToken) {
        let url = `https://api.vk.com/method/friends.get?user_id=${userId}&fields=photo_50&access_token=${accessToken}&v=5.101`;  

        try {
            var data = await jQuery.ajax({
                url : url,
                type : "GET",
                dataType : "jsonp"
            });

            return data.response;
        }
        catch(e) {
            return null;            
        }
    }
}

export default Server;