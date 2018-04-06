import React from 'react';
//import {Col, Row, Table, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {AgGridReact, AgGridColumn } from "ag-grid-react"
import '/node_modules/ag-grid/dist/styles/ag-grid.css';
import '/node_modules/ag-grid/dist/styles/ag-theme-balham.css';
import Button from 'material-ui/Button';





import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, {
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import FolderIcon from 'material-ui-icons/AccountCircle';
import AddIcon from 'material-ui-icons/ChevronRight';

const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    },
});
function generate(element) {
    return [0, 1, 2,3,4,5,6,7].map(value =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}


export class Network extends React.Component{
    constructor(){
        super();

        this.state = {
            validEmail: {},
            confirmation: {}
        };

        this.signIn = this.signIn.bind(this);
        this.signInForm = this.signInForm.bind(this);
        this.c = this.c.bind(this);
    }





    state = {
        dense: false,
        secondary: false,
    };
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
    c()
    {
        FlowRouter.go("/transaction")
    }
    render() {
        let { classes } = this.props;
        const { dense, secondary } = this.state;
        classes= PropTypes.object.isRequired;
        console.log(this.props)
        return (
            <div  className="mx-auto" style={{width: 1200}} >
                <Grid item xs={12} md={6}>
                    <Typography variant="title" className={classes.title}>
                        Resource Network
                    </Typography>
                    <div className={classes.demo}>
                        <List dense={dense}>
                            {generate(
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Company Name"
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                    <ListItemSecondaryAction onClick={this.c}>
                                        <IconButton aria-label="Delete" >
                                            <AddIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>,
                            )}
                        </List>
                    </div>
                </Grid>
                {/*<h4>Compose Bill of lading</h4>*/}

                {/*<Button bsStyle="primary" variant="raised" color="primary" onClick={this.signInForm}>*/}
                    {/*Add Bill of lading*/}
                {/*</Button>*/}
                {/*<Button className="btn-mrg" onClick={this.signIn} >*/}
                    {/*Done*/}
                {/*</Button>*/}
                {/*<div style={{height: 768, width: "100%"}} className="ag-theme-balham">*/}
                {/*<AgGridReact*/}

                    {/*rowData={this.props.bol}*/}
                    {/*rowSelection="single"*/}
                    {/*onSelectionChanged={this.onSelectionChanged.bind(this)}*/}
                {/*>*/}

                    {/*<AgGridColumn field="_id"></AgGridColumn>*/}
                    {/*<AgGridColumn field="userId"></AgGridColumn>*/}
                    {/*<AgGridColumn field="IPFS"></AgGridColumn>*/}
                {/*</AgGridReact>*/}
                {/*</div>*/}
            </div>
        )
    }
    /**/
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
// Network.propTypes = {
//     classes: PropTypes.object.isRequired,
// };
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

        onData(null, { bol, styles});
    }
}

export default compose(getTrackerLoader(reactiveMapper), options)(Network);