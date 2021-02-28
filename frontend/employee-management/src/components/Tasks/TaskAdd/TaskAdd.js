import React from 'react';
import {useHistory} from 'react-router-dom';
import AuthService from "../../../services/authentication/auth.service";


const TaskAdd = (props) => {

    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        projectId: "",
        description: "",
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        const projectId = formData.projectId
        const description = formData.description
        const createdByUsername = AuthService.getCurrentUser()["username"]

        console.log("Fields")
        console.log(projectId)
        console.log(description)
        console.log(createdByUsername)
        props.onAddTask(projectId, description, createdByUsername)
        history.push("/tasks");
    }

    return (
        <div className="row mt-5">

            <div className="col-md-5">
                <h1>Add New Task</h1>
                <form onSubmit={onFormSubmit}>

                    <div className="form-group">
                        <label>Project</label>
                        <select name="projectId" className="form-control" onChange={handleChange}>
                            {props.projects.map((term) =>
                                <option value={term.id}>{term.name} - {term.description}  {term.id}</option>
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Task description</label>
                        <input type="text"
                               className="form-control"
                               id="description"
                               name="description"
                               required
                               placeholder="Enter project description"
                               onChange={handleChange}
                        />
                    </div>


                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default TaskAdd;
