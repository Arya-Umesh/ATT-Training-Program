import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import { encryptData, decryptData } from '../key/secret_key'

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.logout = this.logout.bind(this);
    }

    deleteEmployee(id){
        const login_Id = decryptData('loginId');
        EmployeeService.getEmployeeById(login_Id).then(res => {
            if(res.data['position'] === 'Admin') {
                EmployeeService.deleteEmployee(id).then( res => {
                    this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
                });
            }
        })
        // EmployeeService.deleteEmployee(id).then( res => {
        //     this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        // });
    }
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id){
        const login_Id = decryptData('loginId');
        EmployeeService.getEmployeeById(login_Id).then(res => {
            if(login_Id === id || res.data['position'] === 'Admin') {
                this.props.history.push(`/update-employee/${id}`);
            }
        });
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }

    addEmployee(){
        const login_Id = decryptData('loginId');
        EmployeeService.getEmployeeById(login_Id).then(res => {
            if(res.data['position'] === 'Admin') {
                this.props.history.push('/add-employee');
            }
        });
    }

    logout() {
        encryptData('loginId', '');
        this.props.history.push('');
    }

    render() {
        const login_Id = decryptData('loginId');
        if(login_Id === '') {
            return null;
        }
        return (
            <div>
                 <h2 className="text-center">Employees List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                    <button style={{marginLeft: "auto", marginRight: "0px"}}className="btn btn-primary" onClick={this.logout}>Log Out</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Employee First Name</th>
                                    <th>Employee Last Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                             <td>{employee.id}</td>
                                             <td>{employee.firstName} </td>   
                                             <td>{employee.lastName}</td>
                                             <td>
                                                 <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete</button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View</button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListEmployeeComponent
