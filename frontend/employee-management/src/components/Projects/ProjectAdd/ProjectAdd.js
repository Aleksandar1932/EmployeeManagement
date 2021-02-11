import React from 'react';
import {useHistory} from 'react-router-dom';

const ProjectAdd = (props) => {

    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        name: "",
        description: "",
        location: "",
        managerUsername: "",
        category: "",
        budget: 0
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        const name = formData.name
        const description = formData.description
        const location = formData.location
        const managerUsername = formData.managerUsername
        const category = formData.category
        const budget = formData.budget

        props.onAddProject(name, description, location, managerUsername, category, budget)
        history.push("/projects");
    }

    return (
        <div className="row mt-5">

            <div className="col-md-5">
                <h1>Add New Project</h1>
                <form onSubmit={onFormSubmit}>

                    <div className="form-group">
                        <label htmlFor="name">Project name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               required
                               placeholder="Enter project name"
                               onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Project description</label>
                        <input type="text"
                               className="form-control"
                               id="description"
                               name="description"
                               required
                               placeholder="Enter project description"
                               onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Project location</label>
                        <input type="text"
                               className="form-control"
                               id="location"
                               name="location"
                               required
                               placeholder="Enter project location"
                               onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="managerUsername">Project's Manager Username</label>
                        <input type="text"
                               className="form-control"
                               id="managerUsername"
                               name="managerUsername"
                               required
                               placeholder="Enter project's Manager Username"
                               onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control" onChange={handleChange}>
                            {props.categories.map((term) =>
                                <option value={term}>{term}</option>
                            )}
                        </select>
                    </div>


                    <div className="form-group">
                        <label htmlFor="budget">Project Budget</label>
                        <input type="text"
                               className="form-control"
                               id="budget"
                               name="budget"
                               required
                               placeholder="Enter Project budget"
                               onChange={handleChange}
                        />
                    </div>




                    {/*<div className="form-group">*/}
                    {/*    <label htmlFor="price">Price</label>*/}
                    {/*    <input type="text"*/}
                    {/*           className="form-control"*/}
                    {/*           id="price"*/}
                    {/*           name="price"*/}
                    {/*           placeholder="Price"*/}
                    {/*           required*/}
                    {/*           onChange={handleChange}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className="form-group">*/}
                    {/*    <label htmlFor="quantity">Quantity</label>*/}
                    {/*    <input type="text"*/}
                    {/*           className="form-control"*/}
                    {/*           id="quantity"*/}
                    {/*           name="quantity"*/}
                    {/*           placeholder="Quantity"*/}
                    {/*           required*/}
                    {/*           onChange={handleChange}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className="form-group">*/}
                    {/*    <label>Category</label>*/}
                    {/*    <select name="category" className="form-control" onChange={handleChange}>*/}
                    {/*        {props.categories.map((term) =>*/}
                    {/*            <option value={term.id}>{term.name}</option>*/}
                    {/*        )}*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                    {/*<div className="form-group">*/}
                    {/*    <label>Manufacturer</label>*/}
                    {/*    <select name="manufacturer" className="form-control" onChange={handleChange}>*/}
                    {/*        {props.manufacturers.map((term) =>*/}
                    {/*            <option value={term.id}>{term.name}</option>*/}
                    {/*        )}*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ProjectAdd;
