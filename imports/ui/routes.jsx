import React from 'react';
import {Col, Row, Table, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {AgGridReact, AgGridColumn } from "ag-grid-react"
import '/node_modules/ag-grid/dist/styles/ag-grid.css';
import '/node_modules/ag-grid/dist/styles/ag-theme-balham.css';




import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
});

function getSteps() {
    return ['Request', 'Agreement','Preperation Agreement','Shipping Agreement','Payment Agreement','Transit','Customs','Inspection', 'Delivery'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return "Davey AU agreed to supplier products to Davey NZ. NZ agrees on price of products andpayment terms. It is agreed that when cargo arrives in New Zealand, Davey NZ will payDavey AU.";
        case 1:
            return "Davey AU prepares the stock and once they have a ready date they contact Navia toarrange the movement of goods.";
        case 2:
            return "Navia contacts a shipping line and books space on the next vessel to NZ. the shippingline issue Navia a release so they can collect an empty container from our of theirdepots.";
        case 4:return "Navia arranges for the empty container to be delivered to Davey AU for the to loadgoods into.";
        case 5:return "Once completed Navia arranges collections and delivery to the port.";
        case 6:return "While this is happen Davey AU supply Navia with instructions on how the bill of ladingshould be created.";
        case 7:return "The container is loaded onboard and a bill of lading is issued to Davey AU for them topass onto Davey NZ.";
        case 8:return "The container is moved by vessel to New Zealand and arrives at Auckland port 5 - 7days later.";
        case 9:return "Davey NZ contacts the delivery agent listed on the bill of lading here:";
        default:
            return 'Unknown step';
    }
}


class Routes extends React.Component{
    state = {
        activeStep: 0,
    };

    constructor(){
        super();

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
        Meteor.call('AddBOL', {},  (error, result) => {
            if(error)
            {
                alert(error);
            }else {
               // alert(result);
            }
        });


    }
    onSelectionChanged(g) {
       // alert()
        var selectedRows = g.api.getSelectedRows();
        var selectedRowsString = "";
        selectedRows.forEach(function(selectedRow, index) {
            if (index !== 0) {
                selectedRowsString += ", ";
            }
            selectedRowsString += selectedRow.athlete;
        });
        window.open("https://ipfs.io/ipfs/"+ selectedRows[0].IPFS)
        console.log(selectedRows[0].IPFS);
       // document.querySelector("#selectedRows").innerHTML = selectedRowsString;
    }
    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1,
        });
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1,
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };
    render() {
        //const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        let classes = PropTypes.object

        console.log(this.props)
        return (
            <div  className="mx-auto" style={{width: 900}} >
                <h4>Route</h4>

                <div className={classes.root}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                        <Typography>{getStepContent(index)}</Typography>
                                        <div className={classes.actionsContainer}>
                                            <div>
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={this.handleBack}
                                                    className={classes.button}
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    variant="raised"
                                                    color="primary"
                                                    onClick={this.handleNext}
                                                    className={classes.button}
                                                >
                                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                </Button>
                                            </div>
                                        </div>
                                    </StepContent>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} className={classes.resetContainer}>
                            <Typography>All steps completed - you&quot;re finished</Typography>
                            <Button onClick={this.handleReset} className={classes.button}>
                                Reset
                            </Button>
                        </Paper>
                    )}
                </div>
            </div>
        )
    }
//{/*rowSelection={this.state.rowSelection}*/}
    // columnDefs={this.state.columnDefs}
    // var gridOptions = {
    //     columnDefs: columnDefs,
    //     rowSelection: 'single',
    //     onSelectionChanged: onSelectionChanged
    // };
    //
    // function onSelectionChanged() {
    //     var selectedRows = gridOptions.api.getSelectedRows();
    //     var selectedRowsString = '';
    //     selectedRows.forEach( function(selectedRow, index) {
    //         if (index!==0) {
    //             selectedRowsString += ', ';
    //         }
    //         selectedRowsString += selectedRow.athlete;
    //     });
    //     document.querySelector('#selectedRows').innerHTML = selectedRowsString;
    // }
}
//export default  Bol;
import {compose} from 'react-komposer';
//import SingleContract from '../../ui/pages/SingleContract';
//import {MachinesLookup, Snapshots, OptionsLookup, Agents} from '../../api/lib/collections';
import getTrackerLoader, {options} from "../api/utils/loader"
import {BillOfLading} from "../lib/collections";

function reactiveMapper(props, onData) {

    let id = +props.id;

    if (Meteor.subscribe('BillOfLading').ready()) {
        let  bol = BillOfLading.find({}).fetch();
        // let  optionsLookup = OptionsLookup.find().fetch();
        // let  agents = Agents.find().fetch();
        // let  machinesLookup = MachinesLookup.find().fetch();

        onData(null, { bol});
    }
}

export default compose(getTrackerLoader(reactiveMapper), options)(Routes);