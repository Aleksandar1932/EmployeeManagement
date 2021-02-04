import React from "react";

import ProjectsService from '../../services/projects/projects.service'


const Home = () => {
    ProjectsService.getProjects()
    return (
        <div className="container">
            <header className="jumbotron">
                <h3>Employee Management APP
                </h3>
            </header>
        </div>
    );
};

export default Home;