import React from 'react';
import {Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

class Payment extends React.Component{
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
            <div className="col no_right_padding span_1_of_2 margin_auto float_none large_bottom_margin">



            <Form className="entry-form" horizontal>

                 <FormGroup controlId="formHorizontalUsername">
                    <Col componentClass={ControlLabel} sm={2}>
                        <h4>Add New Card</h4>
                    </Col>
                    <Col sm={10}>
                        <p className="large_bottom_margin">
                        Your card will not be charged at this time. It will be kept on file and will be used as the default for future charges.
                        </p>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalUsername">
                    <Col componentClass={ControlLabel} sm={2}>
                        Name on Card
                    </Col>
                    <Col sm={10}>
                        <input className="form-control" type="text" placeholder="Johnny Appleseed" ref={ref => {this.username = ref}}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        Card Number
                    </Col>
                    <Col sm={10}>
                        <input className="form-control" type="text" style={this.state.validEmail}
                               placeholder="1234 1234 1234 1234" ref={ref => {this.email = ref}}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                        Expiry
                    </Col>
                    <Col sm={10}>
                        <input className="form-control" type="text" placeholder="MM/YY" ref={ref => {this.password = ref}}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalConfirmPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                        CVV
                    </Col>
                    <Col sm={10}>
                        <input className="form-control" type="text" style={this.state.confirmation}
                               placeholder="Confirm Password"
                               ref={ref => {this.confirmPass = ref}}
                        />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalConfirmPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                        Zip
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
                        <Button className="btn-mrg" onClick={this.signInForm}>
                            Add Card
                        </Button>
                        <Button bsStyle="primary" onClick={this.signIn} >
                            Done
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
            </div>
        )
    }
}
export default  Payment;