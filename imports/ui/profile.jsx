import React from 'react';
import {Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import abcui from "airbitz-core-js-ui";
import Payment from "./payment";
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';

import POIcon from 'material-ui-icons/Receipt';
import InvoiceIcon from 'material-ui-icons/MonetizationOn';
import ContractIcon from 'material-ui-icons/InsertDriveFile';
import BOLIcon from 'material-ui-icons/Description';
import RouteIcon from 'material-ui-icons/Explore';
import ContactIcon from 'material-ui-icons/PersonPin';
import MessagesIcon from 'material-ui-icons/Drafts';
import Typography from 'material-ui/Typography';
import Placeholder from "./placeholder";
import UserInfo from "./userinfo"
import EdgeTab from "./edgetab";
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

class Profile extends React.Component{
    constructor(){
        super();


        this.state = {
            value: 0,
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
                            <Tab icon={<MessagesIcon />} label="Profile" />
                            <Tab icon={<POIcon />} label="Credit Card" />
                            <Tab icon={<ContractIcon />} label="Ethereum " />
                            <Tab icon={<BOLIcon />} label="Counter Party Cash" />
                            <Tab icon={<ContactIcon />} label="Counter Party" />
                            <Tab icon={<RouteIcon />} label="Tendermint Token" />
                            <Tab icon={<InvoiceIcon />} label="Edge Authentication" />

                        </Tabs>
                    </AppBar>
                    {/*<br /><img src="/images/po_order_entry.png" /><br/>Send*/}
                    {value === 0 && <TabContainer><UserInfo/></TabContainer>}
                    {value === 1 && <TabContainer><Payment/> </TabContainer>}
                    {value === 2 && <TabContainer><Placeholder/></TabContainer>}
                    {value === 3 && <TabContainer><Placeholder /></TabContainer>}
                    {value === 4 && <TabContainer><Placeholder /></TabContainer>}
                    {value === 5 && <TabContainer><Placeholder/></TabContainer>}
                    {value === 6 && <TabContainer><EdgeTab /></TabContainer>}
                </Paper>
            </div>
        );
    }

    //
    // render() {
    //     return (
    //         <div  className="mx-auto" style={{width: 500}} >
    //
    //             <Payment/>
    //
    //             <Form className="entry-form" horizontal>
    //
    //                 <FormGroup controlId="formHorizontalUsername">
    //                     <Col componentClass={ControlLabel} sm={6}>
    //                         <h4>Edge Auth</h4>
    //                         <p >
    //                             Edge Enabled login allows for login via mobile phone
    //                         </p>
    //                     </Col>
    //                     <Col sm={10}>
    //                         <FormGroup controlId="formHorizontalUsername">
    //
    //                             <Col sm={10}>
    //
    //                             </Col>
    //                         </FormGroup>
    //
    //                         <FormGroup controlId="formHorizontalUsername">
    //                             <Col componentClass={ControlLabel} sm={5}>
    //                                 Token
    //                             </Col>
    //                             <Col sm={10}>
    //                                 <input className="form-control" type="text" placeholder="Token Key" ref={ref => {this.edgekey = ref}}/>
    //                                 <Button bsStyle="primary" onClick={this.signIn} >
    //                                     Link Edge
    //                                 </Button>
    //                             </Col>
    //                         </FormGroup>
    //                     </Col>
    //                 </FormGroup>
    //
    //             </Form>
    //         </div>
    //     )
    // }
}
export default  Profile;