import React from "react";
import AuthService from '../../../services/authentication/auth.service';


const Account = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <div className="container">
            <header className="jumbotron text-center">
                <h3>
                   Your Account
                </h3>
            </header>
            {/*<p>*/}
            {/*    <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}*/}
            {/*    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}*/}
            {/*</p>*/}
            {/*<p>*/}
            {/*    <strong>Id:</strong> {currentUser.id}*/}
            {/*</p>*/}
            {/*<p>*/}
            {/*    <strong>Email:</strong> {currentUser.email}*/}
            {/*</p>*/}
            <strong>Username:</strong>
            <ul>
                <li>{currentUser.username}</li>
            </ul>
            <strong>Authorities:</strong>
            <ul>
                {currentUser.authorities &&
                currentUser.authorities.map((role, index) => <li key={index}>{role.replace("ROLE_","")}</li>)}
            </ul>
            <strong>Account Details:</strong>
            <ul>
                <li>
                Account non-expired:  {currentUser.accountNonExpired ? <span className="badge badge-success">True</span> :
                    <span className="badge badge-danger">False</span>}
                </li>

                <li>
                    Account non-locked:  {currentUser.accountNonLocked ? <span className="badge badge-success">True</span> :
                    <span className="badge badge-danger">False</span>}
                </li>

                <li>
                    Credentials non-expired:  {currentUser.credentialsNonExpired ? <span className="badge badge-success">True</span> :
                    <span className="badge badge-danger">False</span>}
                </li>

                <li>
                    Account enabled:  {currentUser.enabled ? <span className="badge badge-success">True</span> :
                    <span className="badge badge-danger">False</span>}
                </li>
            </ul>
        </div>
    );
};

export default Account;