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

        this.signInForm = this.signInForm.bind(this);
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
}
export default  Transaction;