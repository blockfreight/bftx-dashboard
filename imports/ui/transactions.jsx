import React from 'react';
import {Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Messages from "./messages";
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}

const data = [
    createData('Costco', 159, 6.0, 24, 4.0),
    createData('Navia', 237, 9.0, 37, 4.3),
    createData('Sears', 262, 16.0, 24, 6.0),
    createData('West Wind Co', 305, 3.7, 67, 4.3),
    createData('Target', 356, 16.0, 49, 3.9),
];

class Transactions extends React.Component{
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
        classes= PropTypes.object.isRequired;
        return (

                <div  className="mx-auto tall-panel" style={{width: 1200, background:"white", opacity:.9}}  >

                    <h4>Transactions</h4>
                    <br/>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell numeric>a</TableCell>
                                    <TableCell numeric>b</TableCell>
                                    <TableCell numeric>c</TableCell>
                                    <TableCell numeric>d</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map(n => {
                                    return (
                                        <TableRow key={n.id}>
                                            <TableCell>{n.name}</TableCell>
                                            <TableCell numeric>{n.calories}</TableCell>
                                            <TableCell numeric>{n.fat}</TableCell>
                                            <TableCell numeric>{n.carbs}</TableCell>
                                            <TableCell numeric>{n.protein}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>

        )
    }
}
Transactions.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default  Transactions;