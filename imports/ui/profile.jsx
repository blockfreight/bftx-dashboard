import React from 'react';
import {Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import abcui from "airbitz-core-js-ui";

class Profile extends React.Component{
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
        _abcUi = abcui.makeABCUIContext({'apiKey': 'c0f8c038bd10d138288ff2bd56dbcb999d22801f',
            'appId': 'com.blockfreight.dashboard',
            'assetsPath': '/packages/node_modules/airbitz-core-js-ui/',
            'vendorName': 'Blockfreight Dashboard',
            'vendorImageUrl': 'https://mydomain.com/mylogo.png'});
        _abcUi.openLoginWindow(function(error, account) {
            _account = account;
            this.refs.edgekey.value = "test"
        });

    }

    signInForm(){
        FlowRouter.go('/');
    }

    render() {
        return (
            <div  className="mx-auto" style={{width: 500}} >



                <Form className="entry-form" horizontal>

                    <FormGroup controlId="formHorizontalUsername">
                        <Col componentClass={ControlLabel} sm={5}>
                            <h4>Profile</h4>
                        </Col>
                        <Col sm={10}>
                            <FormGroup controlId="formHorizontalUsername">
                                <Col componentClass={ControlLabel} sm={5}>
                                    <h4>Edge</h4>
                                </Col>
                                <Col sm={10}>
                                    <p >
                                        Edge Enabled login allows for login via mobile phone
                                    </p>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalUsername">
                                <Col componentClass={ControlLabel} sm={5}>
                                    Token
                                </Col>
                                <Col sm={10}>
                                    <input className="form-control" type="text" placeholder="Token Key" ref={ref => {this.edgekey = ref}}/>
                                    <Button bsStyle="primary" onClick={this.signIn} >
                                        Link Edge
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Col>
                    </FormGroup>

                </Form>
            </div>
        )
    }
}
export default  Profile;