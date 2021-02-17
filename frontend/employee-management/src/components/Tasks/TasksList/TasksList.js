import React, {useEffect, useState} from "react";
import TasksService from "../../../services/tasks/tasks.service";
import AuthService from "../../../services/authentication/auth.service";
import TaskTerm from "../TaskTerm/TaskTerm";
import ForbiddenAccess from "../../ForbiddenAccess/ForbiddenAccess";


const TasksList = (props) => {

    const [tasks, setTasks] = useState([])
    const [forbidden, setForbidden] = useState(false)
    useEffect(() => {
        loadTasks();
    }, []);


    const loadTasks = () => {
        if (AuthService.getCurrentUser() === null) {
            setForbidden(true)
        } else {
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
    }

    if (forbidden) {
        return (
            <ForbiddenAccess resourceName={"Tasks"}/>
        )
    } else {


        return tasks.length !== 0 ? (
            <div className={"container mm-4 mt-5"}>
                {AuthService.isCurrentUserManager() === true ? <h3>All Tasks</h3> : <h3>Tasks on your projects</h3>}
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

                    {AuthService.isCurrentUserManager() === true &&
                    <div className="col-sm-12 col-md-12">
                        <a href={"/tasks/add"} className={"btn btn-outline-primary btn-block"}>Add New</a>
                    </div>
                    }


                </div>
            </div>
        ) : <div className="alert alert-warning" role="alert">
            Currently there aren't any tasks!
        </div>
    }
}

export default TasksList