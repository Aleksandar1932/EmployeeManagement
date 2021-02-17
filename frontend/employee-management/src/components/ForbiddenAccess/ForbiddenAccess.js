import React from "react";

const ForbiddenAccess = (props) => {
    return (
        <div className="alert alert-danger" role="alert">
            Access to {props.resourceName} is forbidden!
        </div>
    )
}

export default ForbiddenAccess
