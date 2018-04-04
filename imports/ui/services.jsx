import React from 'react';
import {Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

class Services extends React.Component{
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
            <div  className="mx-auto, tall" style={{ background: 'url("images/port.jpg")'}}  >
                <div  className="mx-auto tall-panel" style={{width: 758, background:"white", opacity:.9}}  >



                <Form className="entry-form" horizontal>

                     <FormGroup controlId="formHorizontalUsername">
                        <Col componentClass={ControlLabel} sm={12}>
                            <h4>Blockfreight™ Engineering</h4>
                            <img width={700} src="images/map.png"/>
                            <p>
                            Blockfreight™ is working internally and approaching potential partners in the space of hardware and devices specific to supply chain applications.
                            </p>
                            <p>
                            If you are interested in our work and want to partners you invited to participate in early testing of software by reference to the company.
                            </p>
                            <p>
                            For more details please contact:
                                <br/><br/>
                            Julian Smith<br/>
                            julian.smith@blockfreight.com<br/>
                            Founder, President & CEO<br/>
                            Blockfreight, Inc.
                                <br/><br/>
                            535 Mission St 14th floor<br/>
                            San Francisco CA 94105<br/>
                            +1 (415) 429-3924
                            </p>
                        </Col>

                    </FormGroup>

                </Form>
                </div>
            </div>
        )
    }
}
export default  Services;