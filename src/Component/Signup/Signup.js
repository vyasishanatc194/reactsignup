/* eslint-disable no-multi-str */
import React, { Component } from 'react';
import './Signup.css';
import { Button, Form } from "semantic-ui-react";

import { isValidEmailAddress, isValidPassword, isValidName } from "../../utils/validators";

class SignupComponent extends Component {
    // Constructor for initialize the Data
    constructor(props) {
        super(props);

        this.initialFormData = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
        };
      
        this.initalErrors = {
            email: false,
            email_message: "",
            password: false,
            password_message: "",
            firstName: false,
            firstName_message: "",
            lastName: false,
            lastName_message: "",
        };

        this.state = {
            isSubmitted: false,
            formData: {...this.initialFormData},
            formError: {...this.initalErrors}
        }        
    }

    // Call Signup Reducer function for API Call
    handleSignup = () => {
        const { formData } = this.state;
        const isValid = this.validateForm(formData);
        if (isValid) {
            this.setState({isSubmitted: true});
            const payload = { 
                "campaignUuid": "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a", 
                "data": formData
            }
            this.props.signup(payload).then(res => {
                this.setState({isSubmitted: false});
                if (res.status === 400) {
                    if (res.data.hasOwnProperty('errors')){
                        this.props.addToast(`${res.data.errors[0].title} - ${res.data.errors[0].detail}`, 
                            { appearance: 'error', autoDismiss: true });
                    }
                } else {
                    this.props.addToast(res.message, { appearance: 'success', autoDismiss: true });
                    this.setState({formData: {...this.initialFormData}});
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    // Validate form data on submit.
    validateForm = (data) => {
        let isFormValid = true;
        const formError = {...this.state.formError};
        if (data.email === '') {
            formError.email = true
            formError.email_message = "Please Enter Email!"
            isFormValid = false;
        } else if (!isValidEmailAddress(data.email)){
            formError.email = true
            formError.email_message = "Please Enter Valid Email!"
            isFormValid = false;
        } else {
            formError.email = false
            formError.email_message = ""
        }
        if (data.password === '') {
            formError.password = true
            formError.password_message = "Please Enter Password!"
            isFormValid = false;
        } else if (!isValidPassword(data.password)){
            formError.password = true
            formError.password_message = "Please Enter Valid Password \
            (Password Must have 6 Characters long, 1 upper case letter, lower case letter, number, and special Character)!"
            isFormValid = false;
        } else {
            formError.password = false
            formError.password_message = ""
        }
        if(data.firstName === '') {
            formError.firstName = true
            formError.firstName_message = "Please Enter FirstName!"
            isFormValid = false;
        } else if (!isValidName(data.firstName)) {
            formError.firstName = true
            formError.firstName_message = "Please Enter Valid FirstName!"
            isFormValid = false;
        } else {
            formError.firstName = false
            formError.firstName_message = ""
        }
        if (data.lastName === '') {
            formError.lastName = true
            formError.lastName_message = "Please Enter LastName!"
            isFormValid = false;
        } else if (!isValidName(data.lastName)) {
            formError.lastName = true
            formError.lastName_message = "Please Enter Valid LastName!"
            isFormValid = false;
        } else {
            formError.lastName = false
            formError.lastName_message = ""
        }
        this.setState({formError})
        return isFormValid;
    }

    handleChangedField = (name, value) => {
        const formError = {...this.state.formError};
        if (name === 'email') {
            formError[`${name}`] = true;
            if (value === '') {
                formError[`${name}_message`] = 'Please Enter Email';
            } else if (!isValidEmailAddress(value)) {
                formError[`${name}_message`] = 'Please Enter Valid Email!';
            } else {
                formError[`${name}`] = false;
                formError[`${name}_message`] = '';
            }
        } else if (name === 'password') {
            formError[`${name}`] = true;
            if (value === '') {
                formError[`${name}_message`] = 'Please Enter Password!';
            } else if (!isValidPassword(value)) {
                formError[`${name}_message`] = "Please Enter Valid Password \
                    (Password Must have 6 Characters long, 1 upper case letter, lower case letter, number, and special Character)!"
            } else {
                formError[`${name}`] = false;
                formError[`${name}_message`] = '';
            }
        } else if (name === 'firstName') {
            formError[`${name}`] = true;
            if (value === '') {
                formError[`${name}_message`] = 'Please Enter FirstName';
            } else if (!isValidName(value)) {
                formError[`${name}_message`] = 'Please Enter Valid FirstName!';
            } else {
                formError[`${name}`] = false;
                formError[`${name}_message`] = '';
            }
        } else if (name === 'lastName') {
            formError[`${name}`] = true;
            if (value === '') {
                formError[`${name}_message`] = 'Please Enter LastName';
            } else if (!isValidName(value)) {
                formError[`${name}_message`] = 'Please Enter Valid LastName!';
            } else {
                formError[`${name}`] = false;
                formError[`${name}_message`] = '';
            }
        }
        this.setState({formError});
    }

    // Handle form field Change
    handleFieldChange = (event) => {
        const { name, value } = event.target;
        const formData = {...this.state.formData};
        formData[name] = value;
        this.setState({ formData }, () => {
            this.handleChangedField(name, value)
        });
    }

    render() {
        return (
            <div className="container signup-container">
                <div className="row card-center">
                    <div className="col-md-6 signup-form-1">
                        <h2>Signup</h2>
                        <Form onSubmit={this.handleSignup}>
                            <Form.Input label="FirstName *"
                                        placeholder="First Name"
                                        onChange={this.handleFieldChange}
                                        name="firstName"
                                        value={this.state.formData.firstName}
                                        error={this.state.formError.firstName}
                                        type="text"/>
                            {
                                this.state.formError.firstName ?
                                    <span className="text-red float-left m-t-10 m-b10">{this.state.formError.firstName_message}</span>
                                : ''
                            }
                            <Form.Input label="LastName *"
                                        placeholder="Last Name"
                                        onChange={this.handleFieldChange}
                                        name="lastName"
                                        value={this.state.formData.lastName}
                                        error={this.state.formError.lastName}
                                        type="text"/>
                            {
                                this.state.formError.lastName ?
                                    <span className="text-red float-left m-t-10 m-b10">{this.state.formError.lastName_message}</span>
                                : ''
                            }
                            <Form.Input label="Email *"
                                        placeholder="Email"
                                        onChange={this.handleFieldChange}
                                        name="email"
                                        value={this.state.formData.email}
                                        error={this.state.formError.email}
                                        type="email"/>
                            {
                                this.state.formError.email ?
                                    <span className="text-red float-left m-t-10 m-b10">{this.state.formError.email_message}</span>
                                : ''
                            }
                            <Form.Input label="Password *"
                                        placeholder="Password"
                                        onChange={this.handleFieldChange}
                                        name="password"
                                        value={this.state.formData.password}
                                        error={this.state.formError.password}
                                        type="password"/>
                            {
                                this.state.formError.password ?
                                    <span className="text-left text-red float-left m-t-10 m-b10">
                                        {this.state.formError.password_message}
                                    </span>
                                : ''
                            }
                            <div className="clearfix">
                                <Button type="submit" primary className="btnSubmit m-t20"
                                    disabled={this.state.isSubmitted}>
                                    Signup
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignupComponent;
