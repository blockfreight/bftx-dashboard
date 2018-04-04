import React from 'react';
import {Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

class Platform extends React.Component{
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
            <div  className="mx-auto, tall" style={{ background: 'url("images/containers_1080.svg")'}}  >
                <div  className="mx-auto tall-panel" style={{width: 758, background:"white", opacity:.9}}  >




                        <Col componentClass={ControlLabel} sm={12}>
                            <h4>Platform</h4>
                            <img width={700} src="images/hub.png"/>
                            <p>
                                Blockchains and supply chains are already becoming a busy crossover, with startups, banks, and
                                major retailers working on proof of concepts to deploy blockchain in order to streamline supply
                                chain processes.
                                Bank of America Merrill Lynch is reportedly developing a blockchain-based experiment for
                                trade finance transactions [24]. Generally, trade finance concerns both domestic and international
                                transactions, where typical activities include lending, issuing letters of credit, factoring, export
                                credit, and insurance. When commonly used, the term “trade finance” is generally reserved for
                                bank products that are specifically linked to underlying national and international trade
                                transactions.
                            </p>
                                <p>
                            If you develop software for global freight or work for a company involved in supply chain, our protocol will interest you.

                            We are devolping in the open Blockfreight™ the blockchain of global freight as an industrial use of the Bitcoin blockchain.

                            If you are interested in co-developing an application or project or if you just want to get involved in the protocol development, please contact:
                            </p>
                            <p>
                                For more details please contact:
                               <br/>
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
                    <Form className="entry-form" horizontal>

                        <FormGroup controlId="formHorizontalUsername">
                    </FormGroup>

                </Form>
                </div>
            </div>
        )
    }
}
export default  Platform;