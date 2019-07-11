import React from 'react';

const Friend = ({id, lastName, firstName, photo, online}) => {
    return <div className="row mt-3" id={id}>
        <img src={photo} width="30" height="30" className="d-inline-block align-top rounded-circle" alt="" />
        <span className="ml-3">{firstName + " " + lastName}</span>
        {online === 1 ? <span className="ml-3 text-success">online</span> : null}
    </div>
};

export default Friend;