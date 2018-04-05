import React from 'react';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import POIcon from 'material-ui-icons/Receipt';
import InvoiceIcon from 'material-ui-icons/MonetizationOn';
import ContractIcon from 'material-ui-icons/InsertDriveFile';
import BOLIcon from 'material-ui-icons/Description';
import RouteIcon from 'material-ui-icons/Explore';
import ContactIcon from 'material-ui-icons/PersonPin';
import MessagesIcon from 'material-ui-icons/Drafts';

import Routes from "../ui/routes"
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import POCompose from "../ui/pocompose"
import BolCompose from "../ui/bolcompose"
import Network from "../ui/network"
import Messages from "./messages";
import Contract from "./contract"
import InvoiceCompose from "./invoicecompose"
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

class Transaction extends React.Component{
    constructor(){
        super();
        state = {
            value: 0,
        };
        // this.state = {
        //     validEmail: {},
        //     confirmation: {}
        // };

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
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <div  className="mx-auto tall-panel" style={{width: 1200, background:"white", opacity:.9}}  >
            <Paper style={{ width: 1200 }}>
                <AppBar position="static" color="default">
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}

                    indicatorColor="secondary"
                    textColor="secondary"
                >

                    <Tab icon={<POIcon />} label="Purchase Order" />
                    <Tab icon={<ContractIcon />} label="Contract" />
                    <Tab icon={<InvoiceIcon />} label="Invoice" />
                    <Tab icon={<BOLIcon />} label="Bill of lading" />
                    <Tab icon={<RouteIcon />} label="Route" />
                    <Tab icon={<ContactIcon />} label="Contacts" />
                    <Tab icon={<MessagesIcon />} label="Messages" />
                </Tabs>
            </AppBar>
                {/*<br /><img src="/images/po_order_entry.png" /><br/>Send*/}
                {value === 0 && <TabContainer><POCompose/> </TabContainer>}
                {value === 1 && <TabContainer><Contract /></TabContainer>}
                {value === 2 && <TabContainer><InvoiceCompose /></TabContainer>}
                {value === 3 && <TabContainer><BolCompose /></TabContainer>}
                {value === 4 && <TabContainer><Routes /></TabContainer>}
                {value === 5 && <TabContainer><Network/></TabContainer>}
                {value === 6 && <TabContainer><Messages /></TabContainer>}
            </Paper>
            </div>
        );
    }
    // render() {
    //     return (
    //         <div  className="mx-auto, tall" style={{ background: 'url("images/ship.jpg")'}}  >
    //             <div  className="mx-auto tall-panel" style={{width: 758, background:"white", opacity:.9}}  >
    //
    //
    //
    //                 <Form className="entry-form" horizontal>
    //
    //                     <FormGroup controlId="formHorizontalUsername">
    //                         <Col componentClass={ControlLabel} sm={5}>
    //                             <h4>Blockfreight™ Whitepaper v1.0.1</h4>
    //                         </Col>
    //                         <Col sm={10}>
    //                             <p >
    //                                 <a href="pdf/BlockfreightWhitepaperFinalDraft.pdf">Download</a>
    //                             </p>
    //                         </Col>
    //                     </FormGroup>
    //
    //                 </Form>
    //                  Purchase Order |  Invoice |  Contract | Bill of lading |  Route  | Contacts | Messages
    //
    //             </div>
    //         </div>
    //     )
    // }
}
export default  Transaction;