import React from 'react';
import ProjectsService from "../../../services/projects/projects.service";
import {Button, Modal} from "react-bootstrap";


const ProjectTerm = (props) => {

    const handleDelete = (id) => {
        console.log("Try to delete: " + id)
        ProjectsService.deleteProjectById(id).then(r => {
            console.log(r.status)
        });
    }

    const [isOpen, setModal] = React.useState(false)

    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }

    const handleUnAssignWorker = (workerUsername) => {
        ProjectsService.unAssignWorker(props.term.id, workerUsername).then(r => console.log(r.status));
    }


    return (
        <>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Assigned Workers on {props.term.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(!props.term.workers.length) ?
                        <div className="alert alert-warning" role="alert"> Currently there aren't any workers
                            assigned!</div>
                        :
                        <ul>
                            {props.term.workers.map((term) =>
                                <li>{term.username} <i>({term.role})</i>
                                    <Button className={"ml-2 btn-sm"} variant="danger" onClick={() => {
                                        handleUnAssignWorker(term.username)
                                    }}>
                                        Un-assign
                                    </Button>
                                </li>
                            )}
                        </ul>}
                </Modal.Body>
                <Modal.Footer>
                    <Button className={"btn-sm btn-block"} variant="info">
                        Assign New
                    </Button>
                    <Button className={"btn-block btn-sm"} variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <tr>
                <td scope={"col"}>{props.term.name}</td>
                <td scope={"col"}>{props.term.description}</td>
                <td scope={"col"}>{props.term.location}</td>
                <td scope={"col"}>{props.term.manager.username}</td>
                <td scope={"col"}>{props.term.category}</td>
                <td scope={"col"}>{props.term.budget}</td>
                <td scope={"col"}>


                    {/*<a className={"btn btn-success btn-sm"}> View All</a>*/}
                    <Button className={"ml-2 btn-sm"} variant="success" onClick={openModal}>
                        View All <span className="ml-1 badge badge-light">{props.term.workers.length}</span>
                    </Button>
                </td>
                <td scope={"col"}>
                    <a className={"btn btn-warning btn-sm ml-1 mr-1"}> Edit</a>

                    <a className={"btn btn-danger btn-sm ml-1 mr-1"} onClick={() => {
                        handleDelete(props.term.id)
                    }}> Delete</a>
                </td>


            </tr>
        </>
    )


}

export default ProjectTerm;