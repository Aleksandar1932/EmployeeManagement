import React from 'react';
import AuthService from "../../../services/authentication/auth.service";
import TasksService from "../../../services/tasks/tasks.service";


const TaskTerm = (props) => {


    const handleDelete = (id) => {
        console.log("Try to delete: " + id)
        // ProjectsService.deleteProjectById(id).then(r => {
        //     console.log(r.status)
        // });
        TasksService.deleteTaskById(id)
    }

    const handleDone = (id) => {
        console.log("Try to done: " + id)
        TasksService.completeTask(id, AuthService.getCurrentUser()["username"])
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
                {AuthService.isCurrentUserManager() === true ?
                    <a className={"btn btn-danger btn-sm ml-1 mr-1"} onClick={() => {handleDelete(props.term.id)}}> Delete</a>
                    : !props.term.isCompleted ?
                    <a className={"btn btn-success btn-sm ml-1 mr-1"} onClick={() => {handleDone(props.term.id)}}> Done</a>
                   : <span className="badge badge-primary">Task is done</span>


                }


            </td>
        </tr>

    )


}

export default TaskTerm;