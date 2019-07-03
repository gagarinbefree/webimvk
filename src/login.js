import React from 'react'
import VK, {Auth} from 'react-vk';

const Login = () => {
	return (
	    <VK apiId={123}>
	      <Auth options={{
	              onAuth: user => {
	                console.log(user);
	              },
            }}/>
	    </VK>
	)
};

export default Login