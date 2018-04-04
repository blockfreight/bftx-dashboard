import React from 'react';
import {Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

class Home extends React.Component{
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
            <div  className="mx-auto, tall" style={{ background: 'url("images/ship.jpg")'}}  >
                <div  className="mx-auto tall-panel" style={{width: 758, background:"white", opacity:.9}}  >



                <Form className="entry-form" horizontal>

                     <FormGroup controlId="formHorizontalUsername">
                        <Col componentClass={ControlLabel} sm={5}>
                            <h4>Blockfreight™ Whitepaper v1.0.1</h4>
                        </Col>
                        <Col sm={10}>
                            <p >
                                <a href="pdf/BlockfreightWhitepaperFinalDraft.pdf">Download</a>
                            </p>
                        </Col>
                    </FormGroup>

                </Form>
                </div>
            </div>
        )
    }
}
export default  Home;