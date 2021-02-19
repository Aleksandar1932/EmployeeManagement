import React, {useEffect, useState} from "react";
import {Link, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "../../services/authentication/auth.service"

import Login from "../AuthenticationPages/Login/Login";
import Register from "../AuthenticationPages/Register/Register";
import Account from "../AuthenticationPages/Account/Account";
import Home from "../Home/Home";
import ProjectsList from "../Projects/ProjectsList/ProjectsList";

import ProjectsService from '../../services/projects/projects.service'
import TasksService from '../../services/tasks/tasks.service'
import ProjectAdd from "../Projects/ProjectAdd/ProjectAdd";
import TasksList from "../Tasks/TasksList/TasksList";
import TaskAdd from "../Tasks/TaskAdd/TaskAdd";
import Helmet from "react-helmet";
import Dashboard from "../Dashboard/Dashboard";


const App = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [projectCategories, setProjectCategories] = useState([])
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            ProjectsService.getProjectCategories().then(r => {
                let categories = r.data
                setProjectCategories(categories)
            })

            ProjectsService.getProjects().then(r => {
                let projects = r.data
                setProjects(projects)
            })
        }


    }, []);


    const logOut = () => {
        AuthService.logout();
    };

    const addProject = (name, description, location, managerUsername, category, budget) => {
        ProjectsService.addProject(name, description, location, managerUsername, category, budget)
            .then(() => {
                console.log("OK")
            });
    }

    const addTask = (projectId, description, createdByUsername) => {
        TasksService.addTask(projectId, description, createdByUsername)
    }

    return (
        <div>
            <Helmet>
                <title>Employee Management</title>
            </Helmet>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    Employee Management
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>

                    </li>


                    {currentUser &&
                    <li>
                        <Link to={"/projects"} className="nav-link">
                            Projects
                        </Link>
                    </li>}
                    {currentUser &&
                    <li>
                        <Link to={"/tasks"} className="nav-link">
                            Tasks
                        </Link>
                    </li>
                    }

                    {
                        currentUser && AuthService.isCurrentUserManager() &&  <li>
                        <Link to={"/dashboard"} className="nav-link">
                        Dashboard
                        </Link>
                        </li>
                    }


                </div>

                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/account"} className="nav-link">
                                {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                Log out
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Register
                            </Link>
                        </li>
                    </div>
                )}
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/home"]} component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/account" component={Account}/>
                    <Route path={"/projects"} exact render={() =>
                        <ProjectsList/>}/>

                    <Route path={"/tasks"} exact render={() =>
                        <TasksList/>}/>
                    <Route path={"/dashboard"} exact render={() => <Dashboard/>}/>


                    <Route path={"/projects/add"} exact render={() =>
                        <ProjectAdd categories={projectCategories}
                                    onAddProject={addProject}
                        />}/>

                    <Route path={"/tasks/add"} exact render={() =>
                        <TaskAdd projects={projects}
                                 onAddTask={addTask}
                        />}/>
                </Switch>
            </div>
        </div>
    );


};

export default App;