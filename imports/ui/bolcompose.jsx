import React from 'react';
import {Col, Row, Table, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import {AgGridReact, AgGridColumn } from "ag-grid-react"
import '/node_modules/ag-grid/dist/styles/ag-grid.css';
import '/node_modules/ag-grid/dist/styles/ag-theme-balham.css';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
const styles = theme => ({
    container: {
        display: 'noflex',
        flexWrap: 'nowrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        marginTop: 0,
        marginBottom: 0,
    },
    menu: {
        width: 200,
    },
    paper: {
        width: '100%',
    },
    papertable: {
        width: '100%',
    },
    grid: {
        width: '100%',
    },
});

class BolCompose extends React.Component {
    constructor() {
        super();

        this.state = {
            validEmail: {},
            confirmation: {}
        };

        this.signIn = this.signIn.bind(this);
        this.signInForm = this.signInForm.bind(this);
        //this.countryCellRenderer = this.countryCellRenderer.bind(this);
    }

    signIn() {
        const pattern = new RegExp(/@/),
            username = this.username.value,
            email = this.email.value,
            password = this.password.value,
            confirmPass = this.confirmPass.value;

        let validation = pattern.test(email),
            confirmation = password === confirmPass;

        if (!validation) {
            this.setState({validEmail: {boxShadow: "0px 0px 10px 1px rgba(245,3,3,1)"}});
        }
        if (validation) {
            this.setState({validEmail: {boxShadow: "none"}});
        }
        if (!confirmation) {
            this.setState({confirmation: {boxShadow: "0px 0px 10px 1px rgba(245,3,3,1)"}});
        }
        if (confirmation) {
            this.setState({confirmation: {boxShadow: "none"}});
        }

        if (username && validation && confirmation) {
            // console.log('confirm');
            Accounts.createUser({username, email, password}, () => {
                Meteor.loginWithPassword(email, password, () => {
                    FlowRouter.go('/home');
                });
            });
        }
    }

    signInForm() {
        Meteor.call('AddBOL', {}, (error, result) => {
            if (error) {
                alert(error);
            } else {
                // alert(result);
            }
        });


    }

    onSelectionChanged(g) {
        // alert()
        var selectedRows = g.api.getSelectedRows();
        var selectedRowsString = "";
        selectedRows.forEach(function (selectedRow, index) {
            if (index !== 0) {
                selectedRowsString += ", ";
            }
            selectedRowsString += selectedRow.athlete;
        });
        window.open("https://ipfs.io/ipfs/" + selectedRows[0].IPFS)
        console.log(selectedRows[0].IPFS);
        // document.querySelector("#selectedRows").innerHTML = selectedRowsString;
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    render() {
        const { classes } = this.props;
        console.log(this.props)
        return (
            <div className="mx-auto" style={{width: 900}}>
                {/*<h4>Compose Bill of lading</h4>*/}
                {/*<Table>*/}
                    {/*<Row>*/}
                        {/*<Col sm={6}>*/}
                            {/*<Form className="entry-form" horizontal>*/}

                                {/*<FormGroup controlId="formHorizontalUsername">*/}
                                    {/*<Col componentClass={ControlLabel} sm={6}>*/}

                                    {/*</Col>*/}
                                    {/*<Col sm={10}>*/}
                                        {/*<h5>*/}
                                            {/*Shipper:*/}
                                        {/*</h5>*/}
                                    {/*</Col>*/}
                                {/*</FormGroup>*/}

                                {/*<FormGroup controlId="formHorizontalUsername">*/}
                                    {/*<Col componentClass={ControlLabel} sm={5}>*/}
                                        {/*Name*/}
                                    {/*</Col>*/}
                                    {/*<Col sm={10}>*/}
                                        {/*<input className="form-control" type="text" placeholder="ACME Waterpumps"*/}
                                               {/*ref={ref => {*/}
                                                   {/*this.username = ref*/}
                                               {/*}}/>*/}
                                    {/*</Col>*/}
                                {/*</FormGroup>*/}

                                {/*<FormGroup controlId="formHorizontalEmail">*/}
                                    {/*<Col componentClass={ControlLabel} sm={5}>*/}
                                        {/*Address*/}
                                    {/*</Col>*/}
                                    {/*<Col sm={10}>*/}
                                        {/*<input className="form-control" type="text" style={this.state.validEmail}*/}
                                               {/*placeholder="123 Main St" ref={ref => {*/}
                                            {/*this.email = ref*/}
                                        {/*}}/>*/}
                                    {/*</Col>*/}
                                {/*</FormGroup>*/}
                                {/*<FormGroup controlId="formHorizontalEmail">*/}
                                    {/*<Col componentClass={ControlLabel} sm={5}>*/}
                                        {/*Address 2*/}
                                    {/*</Col>*/}
                                    {/*<Col sm={10}>*/}
                                        {/*<input className="form-control" type="text" style={this.state.validEmail}*/}
                                               {/*placeholder="" ref={ref => {*/}
                                            {/*this.email = ref*/}
                                        {/*}}/>*/}
                                    {/*</Col>*/}
                                {/*</FormGroup>*/}
                                {/*<FormGroup controlId="formHorizontalPassword">*/}
                                    {/*<Col componentClass={ControlLabel} sm={2}>*/}
                                        {/*City*/}
                                    {/*</Col>*/}
                                    {/*<Col sm={10}>*/}
                                        {/*<input className="form-control" type="text" placeholder="Smallville"*/}
                                               {/*ref={ref => {*/}
                                                   {/*this.password = ref*/}
                                               {/*}}/>*/}
                                    {/*</Col>*/}
                                {/*</FormGroup>*/}

                                {/*<FormGroup controlId="formHorizontalConfirmPassword">*/}
                                    {/*<Col componentClass={ControlLabel} sm={2}>*/}
                                        {/*State*/}
                                    {/*</Col>*/}
                                    {/*<Col sm={10}>*/}
                                        {/*<input className="form-control" type="text" style={this.state.confirmation}*/}
                                               {/*placeholder=""*/}
                                               {/*ref={ref => {*/}
                                                   {/*this.confirmPass = ref*/}
                                               {/*}}*/}
                                        {/*/>*/}
                                    {/*</Col>*/}
                                {/*</FormGroup>*/}

                                {/*<FormGroup controlId="formHorizontalConfirmPassword">*/}
                                    {/*<Col componentClass={ControlLabel} sm={2}>*/}
                                        {/*Country*/}
                                    {/*</Col>*/}
                                    {/*<Col sm={10}>*/}
                                        {/*<input className="form-control" type="text" style={this.state.confirmation}*/}
                                               {/*placeholder="Zoolandia"*/}
                                               {/*ref={ref => {*/}
                                                   {/*this.confirmPass = ref*/}
                                               {/*}}*/}
                                        {/*/>*/}
                                    {/*</Col>*/}
                                {/*</FormGroup>*/}
                                {/*<FormGroup controlId="formHorizontalConfirmPassword">*/}
                                    {/*<Col componentClass={ControlLabel} sm={2}>*/}
                                        {/*Zip*/}
                                    {/*</Col>*/}
                                    {/*<Col sm={10}>*/}
                                        {/*<input className="form-control" type="text" style={this.state.confirmation}*/}
                                               {/*placeholder="123456"*/}
                                               {/*ref={ref => {*/}
                                                   {/*this.confirmPass = ref*/}
                                               {/*}}*/}
                                        {/*/>*/}
                                    {/*</Col>*/}
                                {/*</FormGroup>*/}
                            {/*</Form>*/}
                        {/*</Col>*/}
                        {/*<Col sm={6}>*/}
                            {/*<Form className="entry-form" horizontal>*/}

                                {/*<FormGroup controlId="formHorizontalUsername">*/}
                                    {/*<Col componentClass={ControlLabel} sm={6}>*/}

                                    {/*</Col>*/}
                                    {/*<Col sm={10}>*/}
                                        {/*<h5>*/}
                                            {/*Bill of Lading must be surrendered to:*/}
                                        {/*</h5>*/}
                                    {/*</Col>*/}
                                {/*</FormGroup>*/}

                                {/*<FormGroup controlId="formHorizontalUsername">*/}
                                    {/*<Col componentClass={ControlLabel} sm={5}>*/}
                                        {/*Name*/}
                                    {/*</Col>*/}
                                    {/*<Col sm={10}>*/}
                                        {/*<input className="form-control" type="text" placeholder="ACME Waterpumps"*/}
                                               {/*ref={ref => {*/}
                                                   {/*this.username = ref*/}
                                               {/*}}/>*/}
                                    {/*</Col>*/}
                                {/*</FormGroup>*/}

                                {/*<FormGroup controlId="formHorizontalEmail">*/}
                                    {/*<Col componentClass={ControlLabel} sm={5}>*/}
                                        {/*Address*/}
                                    {/*</Col>*/}
                                    {/*<Col sm={10}>*/}
                                        {/*<input className="form-control" type="text" style={this.state.validEmail}*/}
                                               {/*placeholder="123 Main St" ref={ref => {*/}
                                            {/*this.email = ref*/}
                                        {/*}}/>*/}
                                    {/*</Col>*/}
                                {/*</FormGroup>*/}
                                {/*<FormGroup controlId="formHorizontalEmail">*/}
                                    {/*<Col componentClass={ControlLabel} sm={5}>*/}
                                        {/*Address 2*/}
                                    {/*</Col>*/}
                                    {/*<Col sm={10}>*/}
                                        {/*<input className="form-control" type="text" style={this.state.validEmail}*/}
                                               {/*placeholder="" ref={ref => {*/}
                                            {/*this.email = ref*/}
                                        {/*}}/>*/}
                                    {/*</Col>*/}
                                {/*</FormGroup>*/}
                                {/*<FormGroup controlId="formHorizontalPassword">*/}
                                    {/*<Col componentClass={ControlLabel} sm={2}>*/}
                                        {/*City*/}
                                    {/*</Col>*/}
                                    {/*<Col sm={10}>*/}
                                        {/*<input className="form-control" type="text" placeholder="Smallville"*/}
                                               {/*ref={ref => {*/}
                                                   {/*this.password = ref*/}
                                               {/*}}/>*/}
                                    {/*</Col>*/}
                                {/*</FormGroup>*/}

                                {/*<FormGroup controlId="formHorizontalConfirmPassword">*/}
                                    {/*<Col componentClass={ControlLabel} sm={2}>*/}
                                        {/*State*/}
                                    {/*</Col>*/}
                                    {/*<Col sm={10}>*/}
                                        {/*<input className="form-control" type="text" style={this.state.confirmation}*/}
                                               {/*placeholder=""*/}
                                               {/*ref={ref => {*/}
                                                   {/*this.confirmPass = ref*/}
                                               {/*}}*/}
                                        {/*/>*/}
                                    {/*</Col>*/}
                                {/*</FormGroup>*/}

                                {/*<FormGroup controlId="formHorizontalConfirmPassword">*/}
                                    {/*<Col componentClass={ControlLabel} sm={2}>*/}
                                        {/*Country*/}
                                    {/*</Col>*/}
                                    {/*<Col sm={10}>*/}
                                        {/*<input className="form-control" type="text" style={this.state.confirmation}*/}
                                               {/*placeholder="Zoolandia"*/}
                                               {/*ref={ref => {*/}
                                                   {/*this.confirmPass = ref*/}
                                               {/*}}*/}
                                        {/*/>*/}
                                    {/*</Col>*/}
                                {/*</FormGroup>*/}
                                {/*<FormGroup controlId="formHorizontalConfirmPassword">*/}
                                    {/*<Col componentClass={ControlLabel} sm={2}>*/}
                                        {/*Zip*/}
                                    {/*</Col>*/}
                                    {/*<Col sm={10}>*/}
                                        {/*<input className="form-control" type="text" style={this.state.confirmation}*/}
                                               {/*placeholder="123456"*/}
                                               {/*ref={ref => {*/}
                                                   {/*this.confirmPass = ref*/}
                                               {/*}}*/}
                                        {/*/>*/}
                                    {/*</Col>*/}
                                {/*</FormGroup>*/}
                            {/*</Form>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                {/*</Table>*/}
                <Grid container spacing={24}>
                    <Grid item xs={8} sm={4}>
                        <Paper className={classes.paper}>
                            <TextField
                                id="ponumber"
                                label="Shipper Name"
                                className={classes.textField}
                                value={this.state.ponumber}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <TextField
                                id="name"
                                label="Shipper Address"
                                className={classes.textField}
                                value={this.state.reqnumber}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <TextField
                                id="name"
                                label="Shipper Address 2"
                                className={classes.textField}
                                value={this.state.vendorid}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            /><br/>
                            <TextField
                                id="name"
                                label="Shipper City"
                                className={classes.textField}
                                value={this.state.address}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <TextField
                                id="name"
                                label="Shipper State"
                                className={classes.textField}
                                value={this.state.address2}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <TextField
                                id="name"
                                label="Shipper Zip"
                                className={classes.textField}
                                value={this.state.address2}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <TextField
                                id="name"
                                label="Shipper Country"
                                className={classes.textField}
                                value={this.state.address2}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <Paper className={classes.paper}>
                            <TextField
                                id="ponumber"
                                label="Consignee Name"
                                className={classes.textField}
                                value={this.state.ponumber}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <TextField
                                id="name"
                                label="Consignee Address"
                                className={classes.textField}
                                value={this.state.reqnumber}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <TextField
                                id="name"
                                label="Consignee Address 2"
                                className={classes.textField}
                                value={this.state.vendorid}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            /><br/>
                            <TextField
                                id="name"
                                label="Consignee City"
                                className={classes.textField}
                                value={this.state.address}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <TextField
                                id="name"
                                label="Consignee State"
                                className={classes.textField}
                                value={this.state.address2}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <TextField
                                id="name"
                                label="Consignee Zip"
                                className={classes.textField}
                                value={this.state.address2}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <TextField
                                id="name"
                                label="Consignee Country"
                                className={classes.textField}
                                value={this.state.address2}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <Paper className={classes.paper}>
                            <TextField
                                id="ponumber"
                                label="Notify Name"
                                className={classes.textField}
                                value={this.state.ponumber}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <TextField
                                id="name"
                                label="Notify Address"
                                className={classes.textField}
                                value={this.state.reqnumber}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <TextField
                                id="name"
                                label="Notify Address 2"
                                className={classes.textField}
                                value={this.state.vendorid}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            /><br/>
                            <TextField
                                id="name"
                                label="Notify City"
                                className={classes.textField}
                                value={this.state.address}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <TextField
                                id="name"
                                label="Notify State"
                                className={classes.textField}
                                value={this.state.address2}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <TextField
                                id="name"
                                label="Notify Zip"
                                className={classes.textField}
                                value={this.state.address2}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <TextField
                                id="name"
                                label="Notify Country"
                                className={classes.textField}
                                value={this.state.address2}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Paper className={classes.paper}>
                <Button bsStyle="primary" onClick={this.signInForm}>
                    Add Bill of lading
                </Button>
                <Button className="btn-mrg" onClick={this.signIn}>
                    Done
                </Button>
                <div style={{height: 768, width: "100%"}} className="ag-theme-balham">
                    <AgGridReact

                        rowData={this.props.bol}
                        rowSelection="single"
                        onSelectionChanged={this.onSelectionChanged.bind(this)}
                    >
                        {/* column definitions */}
                        <AgGridColumn field="date"></AgGridColumn>
                        <AgGridColumn field="proof" cellRenderer={BolCompose.countryCellRenderer}></AgGridColumn>
                        <AgGridColumn field="_id"></AgGridColumn>
                        <AgGridColumn field="userId"></AgGridColumn>
                        <AgGridColumn field="IPFS"></AgGridColumn>
                        <AgGridColumn field="BFTX"></AgGridColumn>

                    </AgGridReact>

                </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
      static countryCellRenderer(row)
    {
        if(row && row.data && row.data.proof){
        return row.data.proof[0].hashIdNode;
        }
    }
}
BolCompose.propTypes = {
    classes: PropTypes.object.isRequired,
};

import {compose} from 'react-komposer';
//import SingleContract from '../../ui/pages/SingleContract';
//import {MachinesLookup, Snapshots, OptionsLookup, Agents} from '../../api/lib/collections';
import getTrackerLoader, {options} from "../api/utils/loader"
import {BillOfLading} from "../lib/collections";
import {withStyles} from "material-ui/styles/index";

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

export default compose(getTrackerLoader(reactiveMapper), options)(withStyles(styles)(BolCompose));