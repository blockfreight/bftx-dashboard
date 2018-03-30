import React from 'react';
import {Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

class Connect extends React.Component{
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





                    <p>
                        <Col componentClass={ControlLabel} sm={12}>
                            <h4>How it works</h4>
                            <img width={700} src="images/flow.png"/>
                        </Col>
                        <Col componentClass={ControlLabel} sm={12}>
                        <p>
                            Supply chain relies on trust between parties involved with moving goods. Trust is built
                            around assumptions that information passed between entities is untampered. In regions where
                            trust between entities, including companies and governments, is low, lack of trust often leads to
                            relying only on known and reputable entities for trading relationships. It also prevents
                            exploration of new partnerships with other suppliers as well as creation of new synergies.
                        </p>
                            <p>
                                On top of that, there is ample evidence that suggests fraud in supply chain amounting to
                                enormous proportions . Fraudulent documents create risks to letters of credit, customs
                                agencies, carriers, and many more. Hence, there is a need for documents moving from beginning
                                to the end of supply chain to remain untampered. Adding documents as they are created to a
                                public blockchain may reduce the possibility of double-spending and tampering.
                                This would remove the need for a trusted third party to verify documents and reduce
                                time required to settle payments from banks and insurance companies. It could lower the costs of
                                tracking goods and services by expediting the validation of transactions between multiple parties
                                along supply chain routes . This would have tremendous impact on trade finance.
                            </p>
                        </Col>
                    </p>
                    <Form className="entry-form" horizontal>

                        <FormGroup controlId="formHorizontalUsername">
                            <Col componentClass={ControlLabel} sm={12}>
                                <h4>Blockfreight™ Whitepaper v1.0.1</h4>
                            </Col>
                            <Col sm={10}>
                                <p >
                                    <a href="whitepaper">Download</a>
                                </p>
                            </Col>
                        </FormGroup>


                    </Form>
                </div>
            </div>
        )
    }
}
export default  Connect;