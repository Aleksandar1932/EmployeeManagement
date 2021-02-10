import React from 'react';
import ProjectsService from "../../../services/projects/projects.service";


const projectTerm = (props) => {

    const handleDelete = (id) => {
        console.log("Try to delete: " + id)
        ProjectsService.deleteProjectById(id).then(r => {
            console.log(r.status)});
    }

    return (
        <tr>
            <td scope={"col"}>{props.term.name}</td>
            <td scope={"col"}>{props.term.description}</td>
            <td scope={"col"}>{props.term.location}</td>
            <td scope={"col"}>{props.term.manager.username}</td>
            <td scope={"col"}>{props.term.category}</td>
            <td scope={"col"}>{props.term.budget}</td>
            <td scope={"col"}>{props.term.workers.length} <a className={"btn btn-success btn-sm"}> View All</a></td>
            <td scope={"col"}>
                <a className={"btn btn-warning btn-sm ml-1 mr-1"}> Edit</a>

                <a className={"btn btn-danger btn-sm ml-1 mr-1"} onClick={() => {
                    handleDelete(props.term.id)
                }}> Delete</a>
            </td>


        </tr>
    )


}

export default projectTerm;