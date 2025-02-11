import React, { Component } from 'react'
import { decryptData } from '../key/secret_key';
import { phoneValidation, emailValidation } from '../validation/validation';
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            department: '',
            position: '',
            managerName: '',
            phone: '',
            email: '',
            salary: '',
            password: ''
        }
        this.changeIdHandler = this.changeIdHandler.bind(this);
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeDepartmentHandler = this.changeDepartmentHandler.bind(this);
        this.changePositionHandler = this.changePositionHandler.bind(this);
        this.changeManagerNameHandler = this.changeManagerNameHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    componentDidMount(){
       return;        
    }

    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, department: this.state.department, position: this.state.position, managerName: this.state.managerName, phone: this.state.phone, email: this.state.email, salary: this.state.salary, password: this.state.password};
        // console.log('employee => ' + JSON.stringify(employee));
        const phoneValid = phoneValidation(employee['phone']);
        const emailValid = emailValidation(employee['email']);
        if(!phoneValid) {
            console.log("Invalid phone number");
        }
        if(!emailValid) {
            console.log("Invalid email address");
        }
        if(!phoneValid || !emailValid) {
            return;
        }

        EmployeeService.createEmployee(employee).then(res =>{
            this.props.history.push('/employees');
        });
    }
    
    changeIdHandler= (event) => {
        this.setState({id: event.target.value});
    }

    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeDepartmentHandler= (event) => {
        this.setState({department: event.target.value});
    }

    changePositionHandler= (event) => {
        this.setState({position: event.target.value});
    }

    changeManagerNameHandler= (event) => {
        this.setState({managerName: event.target.value});
    }

    changePhoneHandler= (event) => {
        this.setState({phone: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }

    changeSalaryHandler= (event) => {
        this.setState({salary: event.target.value});
    }

    changePasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        const login_Id = decryptData('loginId');
        if(login_Id === '') {
            return null;
        }
        // var yes = 1;
        // EmployeeService.getEmployeeById(login_Id).then(res => {
        //     if(res.data['position'] !== 'Admin') {
        //         yes = 0;
        //     }
        // });
        // if(yes === 0) {
        //     return null;
        // }
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label>AT&T ID: </label>
                                            <input placeholder="ID" name="id" className="form-control" 
                                                value={this.state.id} onChange={this.changeIdHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label>First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label>Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label>Department: </label>
                                            <input placeholder="Department" name="department" className="form-control" 
                                                value={this.state.department} onChange={this.changeDepartmentHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label>Position: </label>
                                            <input placeholder="Position" name="position" className="form-control" 
                                                value={this.state.position} onChange={this.changePositionHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label>Manager Name: </label>
                                            <input placeholder="Position" name="position" className="form-control" 
                                                value={this.state.managerName} onChange={this.changeManagerNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label>Phone: </label>
                                            <input placeholder="Phone" name="phone" className="form-control" 
                                                value={this.state.phone} onChange={this.changePhoneHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label>Email: </label>
                                            <input placeholder="Email" name="email" className="form-control" 
                                                value={this.state.email} onChange={this.changeEmailHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label>Salary: </label>
                                            <input placeholder="0" name="salary" className="form-control" 
                                                value={this.state.salary} onChange={this.changeSalaryHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label>Password: </label>
                                            <input placeholder="password" type="password" name="password" className="form-control" 
                                                value={this.state.password} onChange={this.changePasswordHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
