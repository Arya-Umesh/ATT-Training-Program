import React, { Component } from 'react'
import { encryptData } from '../key/secret_key';
import './LoginForm.css';
import EmployeeService from '../services/EmployeeService';

encryptData('loginId', '');

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            password: ''
        }
        this.setIdHandler = this.setIdHandler.bind(this);
        this.setPasswordHandler = this.setPasswordHandler.bind(this);
        this.login = this.login.bind(this);
    }

    setIdHandler= (event) => {
        this.setState({id: event.target.value});
    }

    setPasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }

    login = (e) => {
        e.preventDefault();
        try {
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                encryptData("loginId", this.state.id);
                let employee = res.data;
                if(Object.keys(employee).length > 0 && employee.password === this.state.password) {
                    this.props.history.push('/employees');
                }
                else {
                    console.log("Incorrect password");
                }
            });
        }
        catch {
            console.log("Username does not exist");
        }
    }

    render () {
        return (
            <div className='wrapper'>
                <form action="">
                    <h1>Login</h1>
                    <div className='input-box'>
                        <input type='text' placeholder='Username' required onChange={this.setIdHandler}/>
                    </div>
                    <div className='input-box'>
                        <input type='password' placeholder='Password' required onChange={this.setPasswordHandler}/>
                    </div>

                    {/* <div className='remember-forgot'>
                        <label><input type='checkbox' />Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div> */}
                    <button type='submit' onClick={this.login}>Login</button>

                    {/* <div className='register-link'>
                        <p>Don't have an account? <a href="#">Register</a></p>
                    </div> */}
                    <div className='incorrect'>
                        <p>Incorrect username/password</p>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginForm