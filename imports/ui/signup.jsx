import React from 'react';
import {Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

class SignUp extends React.Component{
    constructor(){
        super();

        this.state = {
            validEmail: {},
            confirmation: {}
        };

        this.signIn = this.signIn.bind(this);
        this.signInForm = this.signInForm.bind(this);
    }

    signIn(){
        const pattern = new RegExp(/@/),
            username = this.username.value,
            email = this.email.value,
            password = this.password.value,
            confirmPass = this.confirmPass.value;

        let validation = pattern.test(email),
            confirmation = password === confirmPass;

        if(!validation){
            this.setState({validEmail: {boxShadow: "0px 0px 10px 1px rgba(245,3,3,1)"}});
        }
        if(validation){
            this.setState({validEmail: {boxShadow: "none"}});
        }
        if(!confirmation){
            this.setState({confirmation: {boxShadow: "0px 0px 10px 1px rgba(245,3,3,1)"}});
        }
        if(confirmation){
            this.setState({confirmation: {boxShadow: "none"}});
        }

        if(username && validation && confirmation){
            // console.log('confirm');
            Accounts.createUser({username, email, password}, () => {
                Meteor.loginWithPassword(email, password, () => {
                    FlowRouter.go('/home');
                });
            });
        }
    }

    signInForm(){
        FlowRouter.go('/');
    }

    render() {
        return (
            <div  className="mx-auto, tall" style={{ background: 'url("images/cranes.jpg")'}}  >
            <div  className="mx-auto tall-panel" style={{width: 758, background:"white", opacity:.9}}  >

            <Form className="entry-form" horizontal>
                <FormGroup controlId="formHorizontalUsername">
                    <Col componentClass={ControlLabel} sm={2}>
                        Username
                    </Col>
                    <Col sm={10}>
                        <input className="form-control" type="text" placeholder="Username" ref={ref => {this.username = ref}}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <input className="form-control" type="email" style={this.state.validEmail}
                               placeholder="Email" ref={ref => {this.email = ref}}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <input className="form-control" type="password" placeholder="Password" ref={ref => {this.password = ref}}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalConfirmPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                        Confirm Password
                    </Col>
                    <Col sm={10}>
                        <input className="form-control" type="password" style={this.state.confirmation}
                               placeholder="Confirm Password"
                               ref={ref => {this.confirmPass = ref}}
                        />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>

                        <Button bsStyle="primary" onClick={this.signIn} >
                            Register
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
            </div>
            </div>
        )
    }
}
export default  SignUp;