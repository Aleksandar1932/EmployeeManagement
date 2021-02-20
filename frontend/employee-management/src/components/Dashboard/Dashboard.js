import React, {Component} from 'react'
import Plot from 'react-plotly.js';
import StatisticsService from '../../services/statistics/statistics.service'
import AuthService from "../../services/authentication/auth.service";
import ForbiddenAccess from "../ForbiddenAccess/ForbiddenAccess";


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalNumberOfProjects: 0,
            totalNumberOfTasks: 0,
            totalNumberOfWorkers: 0,
            numberOfProjectsPerManager: {},
            numberOfProjectsPerCategory: {},
            tasksStatusDistribution: {},
            numberOfCompletedTasksPerDay: {},
            numberOfCompletedTasksPerEmployee: {},
            descriptiveStatisticsForCompletionTime: {},
            completionTimePerTask: {}
        }
    }


    componentDidMount() {
        StatisticsService.getTotalNumberOfProjects().then((response) => {
            this.setState({
                totalNumberOfProjects: response.data
            })
        })

        StatisticsService.getTotalNumberOfTasks().then((response) => {
            this.setState({
                totalNumberOfTasks: response.data
            })
        })

        StatisticsService.getTotalNumberOfProjectsPerManager().then((response) => {
            this.setState({
                numberOfProjectsPerManager: response.data
            })
        })

        StatisticsService.getTotalNumberOfProjectsPerCategory().then((response) => {
            this.setState({
                numberOfProjectsPerCategory: response.data
            })
        })

        StatisticsService.getTasksStatusDistribution().then((response) => {
            this.setState({
                tasksStatusDistribution: response.data
            })
        })

        StatisticsService.getCompletedTasksPerDay().then((response) => {
            this.setState({
                numberOfCompletedTasksPerDay: response.data
            })
        })

        StatisticsService.getCompletedTasksPerEmployee().then((response) => {
            this.setState({
                numberOfCompletedTasksPerEmployee: response.data
            })
        })

        StatisticsService.getDescriptiveStatisticsForCompletionTime().then((response) => {
            this.setState({
                descriptiveStatisticsForCompletionTime: response.data
            })
        })

        StatisticsService.getCompletionTimePerTask().then((response) => {
            this.setState({
                completionTimePerTask: response.data
            })
        })

        StatisticsService.getTotalNumberOfWorkers().then((response) => {
            this.setState({
                totalNumberOfWorkers: response.data
            })
        })


    }

    render() {
         return AuthService.isCurrentUserManager() ? (
            <div className={"container mb-4"}>
                <div className="card">
                    <div className="card-header text-center">
                        <h5>Overall Totals</h5>
                    </div>
                    <div className="row text-center p-1">
                        <div className="col-4 text-center">
                            <h6>Projects</h6>
                            <h3>{this.state.totalNumberOfProjects}</h3>


                        </div>
                        <div className="col-4 text-center">
                            <h6>Tasks</h6>
                            <h3>{this.state.totalNumberOfTasks}</h3>
                        </div>
                        <div className="col-4 text-center">
                            <h6>Workers</h6>
                            <h3>{this.state.totalNumberOfWorkers}</h3>
                        </div>
                    </div>
                </div>

                <div className="card mt-3">
                    <div className="card-header text-center">
                        <h5>Projects Statistics</h5>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            {React.createElement(Plot, {
                                data: [
                                    {
                                        type: 'line',
                                        x: Object.keys(this.state.numberOfProjectsPerManager),
                                        y: Object.values(this.state.numberOfProjectsPerManager),
                                        line: {shape: 'spline', color: '#7d1aef', width: 3},
                                    }
                                ],
                                layout: {
                                    title: 'Projects per manager',
                                    autosize: true
                                },
                                useResizeHandler: true,
                                style: {width: "100%", height: "100%"},
                                config: {
                                    staticPlot: true
                                }
                            },)}
                        </div>

                        <div className="col-6">
                            {React.createElement(Plot, {
                                data: [
                                    {
                                        type: 'line',
                                        x: Object.keys(this.state.numberOfProjectsPerCategory),
                                        y: Object.values(this.state.numberOfProjectsPerCategory),
                                        line: {shape: 'spline', color: "7d1aef", width: 3},
                                    }
                                ],
                                layout: {
                                    title: 'Projects per category',
                                    autosize: true
                                },
                                useResizeHandler: true,
                                style: {width: "100%", height: "100%"},
                                config: {
                                    staticPlot: true
                                }
                            })}
                        </div>

                    </div>

                </div>

                <div className="card mt-3 mb-3">
                    <div className="card-header text-center">
                        <h5>Tasks Statistics</h5>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            {React.createElement(Plot, {
                                data: [
                                    {
                                        values: Object.values(this.state.tasksStatusDistribution),
                                        labels: ['Completed', 'Not completed'],
                                        type: 'pie',
                                        marker: {
                                            'colors': [
                                                '#7D1AEF',
                                                '#535354'
                                            ]
                                        },
                                        hole: '0.6'
                                    }
                                ],

                                layout: {
                                    autosize: true,
                                },
                                useResizeHandler: true,
                                style: {width: "100%", height: "100%"},
                                config: {
                                    staticPlot: true
                                },
                                options: {
                                    pieHole: 0.6
                                },
                            })}

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            {React.createElement(Plot, {
                                data: [
                                    {
                                        type: 'line',
                                        x: Object.keys(this.state.numberOfCompletedTasksPerDay),
                                        y: Object.values(this.state.numberOfCompletedTasksPerDay),
                                        line: {shape: 'spline', color: "#101014", width: 3},
                                    }
                                ],
                                layout: {
                                    title: 'Completed tasks by day',
                                    autosize: true,
                                    tickangle: 45
                                },
                                useResizeHandler: true,
                                style: {width: "100%", height: "100%"},
                                config: {
                                    staticPlot: true
                                }
                            })}
                        </div>

                        <div className="col-6">
                            {React.createElement(Plot, {
                                data: [
                                    {
                                        type: 'line',
                                        x: Object.keys(this.state.numberOfCompletedTasksPerEmployee),
                                        y: Object.values(this.state.numberOfCompletedTasksPerEmployee),
                                        line: {shape: 'spline', color: "#101014", width: 3},
                                    }
                                ],
                                layout: {
                                    title: 'Completed tasks by employee',
                                    autosize: true,
                                    displayModeBar: false,
                                    xaxis: {
                                        tickangle: -45
                                    }
                                },
                                displayModeBar: false,

                                useResizeHandler: true,
                                staticPlot: true,
                                style: {width: "100%", height: "100%"},
                                config: {
                                    staticPlot: true
                                }
                            })},
                        </div>

                    </div>



                </div>

                <div className="card">
                    <div className="card-header text-center">
                        <h5>Tasks Completion</h5>
                    </div>
                    <div className="row text-center p-1 mb-1">
                        <div className="col-3 text-center">
                            <h6>Completed</h6>
                            <h3>{this.state.descriptiveStatisticsForCompletionTime["count"]}</h3>
                        </div>
                        <div className="col-3 text-center">
                            <h6>Min Completion Time</h6>
                            <h3>{this.state.descriptiveStatisticsForCompletionTime["min"]} s</h3>
                        </div>
                        <div className="col-3 text-center">
                            <h6>Max Completion Time</h6>
                            <h3>{this.state.descriptiveStatisticsForCompletionTime["max"]} s</h3>
                        </div>

                        <div className="col-3 text-center">
                            <h6>Max Completion Time</h6>
                            <h3>{this.state.descriptiveStatisticsForCompletionTime["average"]} s</h3>
                        </div>
                    </div>

                    <div className="col-12">
                        {React.createElement(Plot, {
                            data: [
                                {
                                    type: 'line',
                                    x: Object.keys(this.state.completionTimePerTask),
                                    y: Object.values(this.state.completionTimePerTask),
                                    line: {shape: 'spline', color: "#5f4dee", width: 4},
                                }
                            ],
                            layout: {
                                autosize: true,
                                displayModeBar: false,
                                xaxis: {
                                    title: 'Task ID',
                                },
                                yaxis: {
                                    title: 'Time (s)',
                                },

                            },
                            useResizeHandler: true,
                            staticPlot: true,
                            style: {width: "100%", height: "100%"},
                            config: {
                                staticPlot: true
                            }
                        })},
                    </div>
                </div>
            </div>


        ) : (   <ForbiddenAccess resourceName={"Dashboard"}/>)
    }
}

export default Dashboard