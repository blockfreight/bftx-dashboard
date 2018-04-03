import React from 'react';
import {Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import Web3 from 'web3';

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
    createData('John Doe', 159, 6.0, 24, 4.0),
    createData('Fred Savage', 237, 9.0, 37, 4.3),
    createData('Marty McFly', 262, 16.0, 24, 6.0),
    createData('Elen Johnson', 305, 3.7, 67, 4.3),
    createData('Jeff Cruis', 356, 16.0, 49, 3.9),
];


class Messages extends React.Component{
    constructor(){
        super();

        this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
        // let data = {
        //     msgs: [],
        //     text: "",
        //     symKeyId: null,
        //     name: "",
        //     asymKeyId: null,
        //     sympw: "",
        //     asym: true,
        //     configured: false,
        //     topic: defaultTopic,
        //     recipientPubKey: defaultRecipientPubKey,
        //     asymPubKey: ""
        // };
        //
        // this.shh.newKeyPair().then(id => {
        //     data.asymKeyId = id;
        //     return this.shh.getPublicKey(id).then(pubKey => this.asymPubKey = pubKey).catch(console.log);
        // }).catch(console.log);
        //
        // if (!this.name || this.name.length == 0) {
        //     alert("Please pick a username");
        //     return;
        // }
        //
        // let filter = {
        //     topics: ['0xdeadbeef']
        // };
        //
        // if (this.asym) {
        //     if(!this.asymKeyId) {
        //         alert("No valid asymmetric key");
        //         return;
        //     }
        //
        //     filter.privateKeyID = this.asymKeyId;
        // } else {
        //     if (!this.symKeyId || this.symKeyId.length == 0) {
        //         alert("please enter a pasword to generate a key!");
        //         return;
        //     }
        //
        //     filter.symKeyID = this.symKeyId;
        // }
        // this.msgFilter = this.shh.newMessageFilter(filter).then(filterId => {
        //     setInterval(() => {
        //         this.shh.getFilterMessages(filterId).then(messages => {
        //             for (let msg of messages) {
        //                 let message = decodeFromHex(msg.payload);
        //                 this.msgs.push({
        //                     name: message.name,
        //                     text: message.text
        //                 });
        //             }
        //         });
        //     }, 1000);
        // });


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
            <div  className="mx-auto" style={{width: 900}} >
                <Form className="entry-form" horizontal>

                    <FormGroup controlId="formHorizontalUsername">
                        <Col componentClass={ControlLabel} sm={5}>
                            <h4>Messages</h4>
                        </Col>
                        <Col sm={10}>

                        </Col>
                    </FormGroup>

                </Form>
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
Messages.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default  Messages;