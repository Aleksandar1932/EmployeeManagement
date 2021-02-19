import React, {Component} from 'react'
import Plot from 'react-plotly.js';


class Dashboard extends Component {
    render() {
        return (
            <div className={"container"}>
                <div className="card">
                    <div className="card-header text-center">
                        <h5>Total</h5>
                    </div>
                    <div className="row text-center p-1">
                        <div className="col-4 text-center">
                            <h6>Projects</h6>
                            <h3>50</h3>


                        </div>
                        <div className="col-4 text-center">
                            <h6>Tasks</h6>
                            <h3>42</h3>
                        </div>
                        <div className="col-4 text-center">
                            <h6>Employees</h6>
                            <h3>65</h3>
                        </div>
                    </div>
                </div>

                <div className="card mt-3">
                    <div className="card-header text-center">
                        <h5>Projects stats</h5>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            {React.createElement(Plot, {
                                data: [
                                    {
                                        type: 'line',
                                        x: ["admin", "aleksandar", "john", "peter", "joshua"],
                                        y: [2, 5, 3, 10, 2, 3],
                                        line: {shape: 'spline', color: '#7d1aef'},
                                    }
                                ],
                                layout: {
                                    title: 'Projects per manager',
                                    autosize: true
                                },
                                useResizeHandler: true,
                                style: {width: "100%", height: "100%"}
                            })}
                        </div>

                        <div className="col-6">
                            {React.createElement(Plot, {
                                data: [
                                    {
                                        type: 'line',
                                        x: ["CONSTRUCTION", "DESIGN", "DEVELOPMENT"],
                                        y: [2, 5, 3],
                                        line: {shape: 'spline', color: "7d1aef"},
                                    }
                                ],
                                layout: {
                                    title: 'Projects per category',
                                    autosize: true
                                },
                                useResizeHandler: true,
                                style: {width: "100%", height: "100%"}
                            })}
                        </div>

                    </div>

                </div>

                <div className="card mt-3 mb-3">
                    <div className="card-header text-center">
                        <h5>Tasks stats</h5>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            {React.createElement(Plot, {
                                data: [
                                    {
                                        values: [152, 36],
                                        labels: ['Completed', 'Not completed'],
                                        type: 'pie'
                                    }
                                ],
                                layout: {
                                    title: 'Status',
                                    autosize: true
                                },
                                useResizeHandler: true,
                                style: {width: "100%", height: "100%"}
                            })}

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            {React.createElement(Plot, {
                                data: [
                                    {
                                        type: 'line',
                                        x: ["admin", "aleksandar", "john", "peter", "joshua"],
                                        y: [2, 5, 3, 10, 2, 3],
                                        line: {shape: 'spline', color:"#101014"},
                                    }
                                ],
                                layout: {
                                    title: 'Completed tasks by day',
                                    autosize: true
                                },
                                useResizeHandler: true,
                                style: {width: "100%", height: "100%"}
                            })}
                        </div>

                        <div className="col-6">
                            {React.createElement(Plot, {
                                data: [
                                    {
                                        type: 'line',
                                        x: ["CONSTRUCTION", "DESIGN", "DEVELOPMENT"],
                                        y: [2, 5, 3],
                                        line: {shape: 'spline', color:"#101014"},
                                    }
                                ],
                                layout: {
                                    title: 'Completed tasks by employee',
                                    autosize: true
                                },
                                useResizeHandler: true,
                                style: {width: "100%", height: "100%"}
                            })}
                        </div>

                    </div>

                </div>
            </div>


        )
    }
}

export default Dashboard