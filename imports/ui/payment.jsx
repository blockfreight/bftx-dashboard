import React from 'react';
import {Col, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {Button} from "./components";
import {TextField, Grid, Paper}from 'material-ui';
import {withStyles} from "material-ui/styles/index";
styles = theme => ({
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

class Payment extends React.Component{
    constructor(){
        super();

        this.state = {
            validEmail: {},
            confirmation: {}
        };

        this.done = this.done.bind(this);
        this.addCard = this.addCard.bind(this);
    }

    done(){
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

    addCard(){
        Meteor.call('AddCard',  {}, (error, result) => {
            if(error)
            {
                alert(error);
            }else {
                // alert(result);
            }
        });
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    render() {
        const { classes } = this.props;
        // className="mx-auto" style={{width: 300}}
        return (
            <div  >
                <Grid item xs={8} sm={4}>

                <Paper className={classes.paper}>
                    <TextField
                        id="ponumber"
                        label=" Name on Card"
                        className={classes.textField}
                        value={this.state.ponumber}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    <TextField
                        id="name"
                        label=" Card Number"
                        className={classes.textField}
                        value={this.state.reqnumber}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    <TextField
                        id="name"
                        label=" Expiry"
                        className={classes.textField}
                        value={this.state.vendorid}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    /><br/>
                    <TextField
                        id="name"
                        label=" CVV"
                        className={classes.textField}
                        value={this.state.address}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    <TextField
                        id="name"
                        label=" Zip"
                        className={classes.textField}
                        value={this.state.address2}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                </Paper>
                <Button bsStyle="primary" type="button" color="primary" onClick={this.addCard} >
                Update
                </Button>
                </Grid>
            {/*<Form className="entry-form" horizontal>*/}



                {/*<FormGroup controlId="formHorizontalUsername">*/}
                    {/*<Col componentClass={ControlLabel} sm={5}>*/}
                        {/*Name on Card*/}
                    {/*</Col>*/}
                    {/*<Col sm={10}>*/}
                        {/*<input className="form-control" type="text" placeholder="Johnny Appleseed" ref={ref => {this.username = ref}}/>*/}
                    {/*</Col>*/}
                {/*</FormGroup>*/}

                {/*<FormGroup controlId="formHorizontalEmail">*/}
                    {/*<Col componentClass={ControlLabel} sm={5}>*/}
                        {/*Card Number*/}
                    {/*</Col>*/}
                    {/*<Col sm={10}>*/}
                        {/*<input className="form-control" type="text" style={this.state.validEmail}*/}
                               {/*placeholder="1234 1234 1234 1234" ref={ref => {this.email = ref}}/>*/}
                    {/*</Col>*/}
                {/*</FormGroup>*/}

                {/*<FormGroup controlId="formHorizontalPassword">*/}
                    {/*<Col componentClass={ControlLabel} sm={2}>*/}
                        {/*Expiry*/}
                    {/*</Col>*/}
                    {/*<Col sm={10}>*/}
                        {/*<input className="form-control" type="text" placeholder="MM/YY" ref={ref => {this.password = ref}}/>*/}
                    {/*</Col>*/}
                {/*</FormGroup>*/}

                {/*<FormGroup controlId="formHorizontalConfirmPassword">*/}
                    {/*<Col componentClass={ControlLabel} sm={2}>*/}
                        {/*CVV*/}
                    {/*</Col>*/}
                    {/*<Col sm={10}>*/}
                        {/*<input className="form-control" type="text" style={this.state.confirmation}*/}
                               {/*placeholder="123"*/}
                               {/*ref={ref => {this.confirmPass = ref}}*/}
                        {/*/>*/}
                    {/*</Col>*/}
                {/*</FormGroup>*/}

                {/*<FormGroup controlId="formHorizontalConfirmPassword">*/}
                    {/*<Col componentClass={ControlLabel} sm={2}>*/}
                        {/*Zip*/}
                    {/*</Col>*/}
                    {/*<Col sm={10}>*/}
                        {/*<input className="form-control" type="password" style={this.state.confirmation}*/}
                               {/*placeholder="91210"*/}
                               {/*ref={ref => {this.confirmPass = ref}}*/}
                        {/*/>*/}
                    {/*</Col>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup>*/}
                    {/*<Col smOffset={2} sm={10}>*/}
                        {/*<Button bsStyle="primary" type="button" color="primary" onClick={this.addCard} >*/}
                            {/*Update*/}
                        {/*</Button>*/}
                        {/*/!*<Button  bsStyle="primary" onClick={this.addCard}>*!/*/}
                            {/*/!*Update*!/*/}
                        {/*/!*</Button>*!/*/}
                        {/*/!*<Button className="btn-mrg"  onClick={this.signIn} >*!/*/}
                            {/*/!*Done*!/*/}
                        {/*/!*</Button>*!/*/}
                    {/*</Col>*/}
                {/*</FormGroup>*/}
            {/*</Form>*/}
            </div>
        )
    }
}
export default withStyles(styles)(Payment);