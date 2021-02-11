import React from 'react';
import ProjectsService from "../../../../services/projects/projects.service";


const AssignWorker = (props) => {

    const [formData, updateFormData] = React.useState({
        name: "",
    })

    const onFormSubmit = (e) => {
        e.preventDefault()
        const username = formData.name

        ProjectsService.assignWorker(props.projectId,username).then(()=>{})
    }

    const handleChange = (e) => {
        updateFormData({
            [e.target.name]: e.target.value
        })


    }

    return (

        <form onSubmit={onFormSubmit} className={"form-inline"}>
                <input type="text"
                       className="form-control form-control-sm flex-fill"
                       id="name"
                       name="name"
                       required
                       placeholder="Enter worker's name"
                       onChange={handleChange}
                />
            <button id="submit" type="submit" className="ml-2 btn btn-info btn-sm">Assign</button>
        </form>


    )
}

export default AssignWorker