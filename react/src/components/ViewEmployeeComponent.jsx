import React, { Component } from 'react'
import { decryptData } from '../key/secret_key'
import EmployeeService from '../services/EmployeeService'

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( res => {
            this.setState({employee: res.data});
        })
    }

    goBack(){
        this.props.history.push('/employees');
    }

    render() {
        const login_Id = decryptData('loginId');
        if(login_Id === '') {
            return null;
        }
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center">View Employee Details</h3>
                    <div className = "card-body">
                    <div className = "row">
                            <label>AT&T ID: </label>
                            <div>&nbsp; { this.state.employee.id }</div>
                        </div>
                        <div className = "row">
                            <label>First Name: </label>
                            <div>&nbsp; { this.state.employee.firstName }</div>
                        </div>
                        <div className = "row">
                            <label>Last Name: </label>
                            <div>&nbsp; { this.state.employee.lastName }</div>
                        </div>
                        <div className = "row">
                            <label>Department: </label>
                            <div>&nbsp; { this.state.employee.department }</div>
                        </div>
                        <div className = "row">
                            <label>Position: </label>
                            <div>&nbsp; { this.state.employee.position }</div>
                        </div>
                        <div className = "row">
                            <label>Manager Name: </label>
                            <div>&nbsp; { this.state.employee.managerName }</div>
                        </div>
                        <div className = "row">
                            <label>Phone: </label>
                            <div>&nbsp; { this.state.employee.phone }</div>
                        </div>
                        <div className = "row">
                            <label>Email: </label>
                            <div>&nbsp; { this.state.employee.email }</div>
                        </div>
                        <div className = "row">
                            <label>Salary: </label>
                            <div>&nbsp; { this.state.employee.salary }</div>
                        </div>

                        <button onClick={ () => this.goBack()} className="btn btn-info">Back</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent
