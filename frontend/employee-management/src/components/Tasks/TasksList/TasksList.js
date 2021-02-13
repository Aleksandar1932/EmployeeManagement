import React, {useEffect, useState} from "react";
import TasksService from "../../../services/tasks/tasks.service";
import AuthService from "../../../services/authentication/auth.service";
import TaskTerm from "../TaskTerm/TaskTerm";


const TasksList = (props) => {

    const [tasks, setTasks] = useState([])
    const [forbidden, setForbidden] = useState(false)
    useEffect(() => {
        loadTasks();
    }, []);


    const loadTasks = () => {
        if (AuthService.isCurrentUserManager() === true) {
            TasksService.getTasks().then((response) => {
                if (response.status === 403) {
                    setForbidden(true)
                }
                setTasks(response.data);
            })
        } else {
            TasksService.getTasks(AuthService.getCurrentUser()["username"]).then((response) => {
                if (response.status === 403) {
                    setForbidden(true)
                }
                setTasks(response.data);
            })
            // setForbidden(true)
        }

    }

    if (forbidden) {
        return (
            <div className="alert alert-danger" role="alert">
                Access not allowed!
            </div>
        )
    } else {


        return tasks.length !== 0 ? (
            <div className={"container mm-4 mt-5"}>
                <h3>All Tasks</h3>
                <div className={"row"}>
                    <div className={"table-responsive"}>
                        <div className="col-sm-12 col-md-12">
                            <table className={"table table-striped"}>
                                <thead>
                                <th scope={"col"}>Description</th>
                                <th scope={"col"}>Project Name</th>
                                <th scope={"col"}>Created</th>
                                <th scope={"col"}>Completed</th>
                                <th scope={"col"}>Actions</th>
                                </thead>

                                <tbody>
                                {tasks.map((term) => {
                                    return (
                                        <TaskTerm term={term}/>
                                    );
                                })}

                                </tbody>


                            </table>
                        </div>
                    </div>

                    {AuthService.getCurrentUser()["role"].includes("MANAGER") === true &&
                    <div className="col-sm-12 col-md-12">
                        <a href={"/projects/add"} className={"btn btn-outline-primary btn-block"}>Add New</a>
                    </div>
                    }


                </div>
            </div>
        ) : <div className="alert alert-warning" role="alert">
            Currently there aren't any projects!
        </div>
    }
}

export default TasksList