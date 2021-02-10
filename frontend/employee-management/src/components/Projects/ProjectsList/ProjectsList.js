import ProjectTerm from "../ProjectTerm/ProjectTerm";
import React, {useEffect, useState} from "react";
import ProjectsService from "../../../services/projects/projects.service";

const ProjectsList = (props) => {

    const [projects, setProjects] = useState([])
    const [forbidden, setForbidden] = useState(false)
    useEffect(() => {
        loadProjects();
    }, []);


    const loadProjects = () => {
        ProjectsService.getProjects().then((response) => {
            if (response.status === 403){
                setForbidden(true)
            }
            setProjects(response.data);
        })
    }

    if (forbidden){
        return (
            <div className="alert alert-danger" role="alert">
                Access not allowed!
            </div>
        )
    }



    return projects.length !== 0 ? (
        <div className={"container mm-4 mt-5"}>
            <h3>All Projects</h3>
            <div className={"row"}>
                <div className={"table-responsive"}>
                    <table className={"table table-striped"}>
                        <thead>
                        <th scope={"col"}>Name</th>
                        <th scope={"col"}>Description</th>
                        <th scope={"col"}>Location</th>
                        <th scope={"col"}>Manager</th>
                        <th scope={"col"}>Category</th>
                        <th scope={"col"}>Budget</th>
                        <th scope={"col"}>Workers</th>
                        <th scope={"col"}>Actions</th>
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
                <div className="col mb-3">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            {
                                <a href={"#"} className={"btn btn-primary btn-block"}>Add New</a>
                                /*<Link className={"btn btn-block btn-dark"} to={"/products/add"}>Add new product</Link>*/}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    ) : <div className="alert alert-warning" role="alert">
        Currently there aren't any projects!
    </div>
}

export default ProjectsList