import React from 'react';
import {Button} from 'react-bootstrap';
import { Link } from "react-router-dom";

export const UserInfo = ({email, username, handleDeregister}) =>{
    return(
    <>    
    <br />
    <p>name: {username}</p>
    <p>e-mail: {email}</p>    
        <Link to="/signup" className="d-flex justify-content-end">
        <Button variant="link" style={{color: "red"}} onClick={handleDeregister}> Delete account </Button> 
        </Link>
    </>
    );
};