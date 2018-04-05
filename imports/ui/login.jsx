import React from 'react';
import {Col, Form, FormGroup, ControlLabel, Row, Button} from 'react-bootstrap';

var abcui = require('airbitz-core-js-ui')

export default class Login extends React.Component {
    constructor() {
        super();
        this.formHandler = this.formHandler.bind(this);
        this.regForm = this.regForm.bind(this);
        this.edge = this.edge.bind(this);
        this.state = {
            authError: false,
            validationError: ''
        }
        _abcUi = abcui.makeABCUIContext({'apiKey': 'c0f8c038bd10d138288ff2bd56dbcb999d22801f',
            'appId': 'com.blockfreight.dashboard',
            'assetsPath': '/packages/node_modules/airbitz-core-js-ui/',
            'vendorName': 'Blockfreight Dashboard',
            'vendorImageUrl': 'https://mydomain.com/mylogo.png'});
    }

    formHandler(e) {
        e.preventDefault();

        let email = this.refs.email.value.trim(),
            password = this.refs.password.value.trim();

        if (email && password) {
            Meteor.loginWithPassword({email}, password, (err) => {
                if (err) {
                    this.setState({authError: true});
                    console.log('Authentification failed');
                }
                else {
                    FlowRouter.go("/dashboard");
                }
            });
        }
        else {
            this.setState({
                validationError: "One or more fields are emptry!"
            });
        }
    }
    regForm(){
        FlowRouter.go('/signup');

    }
    edge(){
        _abcUi.openLoginWindow(function(error, account) {
            _account = account;
            Meteor.loginWithToken("hWzDlG1eq13j2BisLVgOmy+DnJm9nKBN14b1eMElxN8=",(err,res)=>{
                FlowRouter.go("/dashboard");
            });


        });
    }
    render() {
        return (
            <div  className="mx-auto, tall" style={{ background: 'url("images/sfgg.png")'}}  >
            <div  className="mx-auto tall-panel" style={{width: 758, background:"white", opacity:.9}}  >

            <div className="col-md-2 col-md-offset-5 centered">
            <Form className="entry-form" horizontal>
                {this.state.authError ? <Col className="error-label">Authentification failed!!</Col> : null}
                {this.state.validationError ? <Col className="error-label">{this.state.validationError}</Col> : null}

                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <input className="form-control" type="text" placeholder="Email" ref="email"/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <input className="form-control" type="password" placeholder="Password" ref="password"/>
                    </Col>
                </FormGroup>


                    <Col smOffset={2} sm={10}>
                        <Button bsStyle="primary" onClick={this.formHandler}>
                            Sign in
                        </Button>
                        <Button className="btn-mrg" onClick={this.edge}>
                            Edge
                        </Button>


                    </Col>
                <Row>
                </Row>
            </Form>
            </div>
            </div>
            </div>
        );
    }
}