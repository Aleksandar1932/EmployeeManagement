import ProjectTerm from "../ProjectTerm/ProjectTerm";
import React, {useEffect, useState} from "react";
import ProjectsService from "../../../services/projects/projects.service";
import AuthService from "../../../services/authentication/auth.service";
import ForbiddenAccess from "../../ForbiddenAccess/ForbiddenAccess";


const ProjectsList = (props) => {

    const [projects, setProjects] = useState([])
    const [forbidden, setForbidden] = useState(false)
    useEffect(() => {
        loadProjects();
    }, []);


    const loadProjects = () => {
        if (AuthService.getCurrentUser() === null) {
            setForbidden(true)
        } else {
            if (AuthService.isCurrentUserManager() === true) {
                ProjectsService.getProjects().then((response) => {
                    if (response.status === 403 || AuthService.getCurrentUser() === undefined) {
                        setForbidden(true)
                    }
                    setProjects(response.data);
                })
            } else {
                ProjectsService.getProjects(AuthService.getCurrentUser()["username"]).then((response) => {
                    if (response.status === 403) {
                        setForbidden(true)
                    }
                    setProjects(response.data);
                })
            }
        }
    }

    if (forbidden) {
     return (
         <ForbiddenAccess resourceName={"Projects"}/>
     )
    } else {


        return projects.length !== 0 ? (
            <div className={"container mm-4 mt-5"}>
                {AuthService.isCurrentUserManager() === true ? <h3>All Projects</h3> :
                    <h3>Projects on which you are assigned</h3>}
                <div className={"row"}>
                    <div className={"table-responsive"}>
                        <div className="col-sm-12 col-md-12">
                            <table className={"table table-striped"}>
                                <thead>
                                <th scope={"col"}>Name</th>
                                <th scope={"col"}>Description</th>
                                <th scope={"col"}>Location</th>
                                <th scope={"col"}>Manager</th>
                                <th scope={"col"}>Category</th>
                                <th scope={"col"}>Budget</th>
                                {AuthService.isCurrentUserManager() === true && <th scope={"col"}>Workers</th>}
                                {AuthService.isCurrentUserManager() === true && <th scope={"col"}>Actions</th>}
                                </thead>

                                <tbody>
                                {projects.map((term) => {
                                    return (
                                        <ProjectTerm term={term}/>
                                    );
                                })}

                                </tbody>


                            </table>
                        </div>
                    </div>



                </div>
            </div>
        ) :
            <div>
                <div className="alert alert-warning" role="alert">
                    Currently there aren't any projects!
                </div>
                {AuthService.isCurrentUserManager() === true &&
                <div className="col-sm-12 col-md-12">
                    <a href={"/projects/add"} className={"btn btn-outline-primary btn-block"}>Add New</a>
                </div>
                }

            </div>

    }
}

export default ProjectsList