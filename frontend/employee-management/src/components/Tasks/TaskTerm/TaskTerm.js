import React from 'react';


const TaskTerm = (props) => {


    const handleDelete = (id) => {
        console.log("Try to delete: " + id)
        // ProjectsService.deleteProjectById(id).then(r => {
        //     console.log(r.status)
        // });
    }


    return (
        <tr>
            <td scope={"col"}>{props.term.description}</td>
            <td scope={"col"}>{props.term.project.name}</td>
            <td scope={"col"}>by {props.term.createdBy.username} @ {props.term.createdAt}</td>
            <td scope={"col"}>{
                props.term.isCompleted ?
                    <p>by {props.term.completedBy.username} @ {props.term.completedAt}}</p>
                    : <p>Not Completed</p>
            }
            </td>
            <td scope={"col"}>
                <a className={"btn btn-danger btn-sm ml-1 mr-1"} onClick={() => {
                    handleDelete(props.term.id)
                }}> Delete</a>
            </td>
        </tr>

    )


}

export default TaskTerm;