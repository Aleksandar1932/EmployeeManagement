import React from 'react';

const projectTerm = (props) => {
    return (
        <tr>
            <td scope={"col"}>{props.term.name}</td>
            <td scope={"col"}>{props.term.description}</td>
            <td scope={"col"}>{props.term.location}</td>
            <td scope={"col"}>{props.term.manager.username}</td>
            <td scope={"col"}>{props.term.category}</td>
            <td scope={"col"}>{props.term.budget}</td>
            <td scope={"col"}>{props.term.workers.length} <a className={"btn btn-success btn-sm"}> View All</a></td>
        </tr>
    )


}

export default projectTerm;