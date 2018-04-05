import React from 'react';
import {Col, Row, Table, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import {AgGridReact, AgGridColumn } from "ag-grid-react"
import '/node_modules/ag-grid/dist/styles/ag-grid.css';
import '/node_modules/ag-grid/dist/styles/ag-theme-balham.css';

class Bol extends React.Component {
    constructor() {
        super();

        this.state = {
            validEmail: {},
            confirmation: {}
        };

        this.signIn = this.signIn.bind(this);
        this.signInForm = this.signInForm.bind(this);
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

    render() {
        console.log(this.props)
        return (
            <div className="mx-auto" style={{width: 900}}>
                <h4>Compose Bill of lading</h4>
                <Table>
                    <Row>
                        <Col sm={6}>
                            <Form className="entry-form" horizontal>

                                <FormGroup controlId="formHorizontalUsername">
                                    <Col componentClass={ControlLabel} sm={6}>

                                    </Col>
                                    <Col sm={10}>
                                        <h5>
                                            Shipper:
                                        </h5>
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalUsername">
                                    <Col componentClass={ControlLabel} sm={5}>
                                        Name
                                    </Col>
                                    <Col sm={10}>
                                        <input className="form-control" type="text" placeholder="ACME Waterpumps"
                                               ref={ref => {
                                                   this.username = ref
                                               }}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalEmail">
                                    <Col componentClass={ControlLabel} sm={5}>
                                        Address
                                    </Col>
                                    <Col sm={10}>
                                        <input className="form-control" type="text" style={this.state.validEmail}
                                               placeholder="123 Main St" ref={ref => {
                                            this.email = ref
                                        }}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalEmail">
                                    <Col componentClass={ControlLabel} sm={5}>
                                        Address 2
                                    </Col>
                                    <Col sm={10}>
                                        <input className="form-control" type="text" style={this.state.validEmail}
                                               placeholder="" ref={ref => {
                                            this.email = ref
                                        }}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalPassword">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        City
                                    </Col>
                                    <Col sm={10}>
                                        <input className="form-control" type="text" placeholder="Smallville"
                                               ref={ref => {
                                                   this.password = ref
                                               }}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalConfirmPassword">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        State
                                    </Col>
                                    <Col sm={10}>
                                        <input className="form-control" type="text" style={this.state.confirmation}
                                               placeholder=""
                                               ref={ref => {
                                                   this.confirmPass = ref
                                               }}
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalConfirmPassword">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Country
                                    </Col>
                                    <Col sm={10}>
                                        <input className="form-control" type="text" style={this.state.confirmation}
                                               placeholder="Zoolandia"
                                               ref={ref => {
                                                   this.confirmPass = ref
                                               }}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalConfirmPassword">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Zip
                                    </Col>
                                    <Col sm={10}>
                                        <input className="form-control" type="text" style={this.state.confirmation}
                                               placeholder="123456"
                                               ref={ref => {
                                                   this.confirmPass = ref
                                               }}
                                        />
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col sm={6}>
                            <Form className="entry-form" horizontal>

                                <FormGroup controlId="formHorizontalUsername">
                                    <Col componentClass={ControlLabel} sm={6}>

                                    </Col>
                                    <Col sm={10}>
                                        <h5>
                                            Bill of Lading must be surrendered to:
                                        </h5>
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalUsername">
                                    <Col componentClass={ControlLabel} sm={5}>
                                        Name
                                    </Col>
                                    <Col sm={10}>
                                        <input className="form-control" type="text" placeholder="ACME Waterpumps"
                                               ref={ref => {
                                                   this.username = ref
                                               }}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalEmail">
                                    <Col componentClass={ControlLabel} sm={5}>
                                        Address
                                    </Col>
                                    <Col sm={10}>
                                        <input className="form-control" type="text" style={this.state.validEmail}
                                               placeholder="123 Main St" ref={ref => {
                                            this.email = ref
                                        }}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalEmail">
                                    <Col componentClass={ControlLabel} sm={5}>
                                        Address 2
                                    </Col>
                                    <Col sm={10}>
                                        <input className="form-control" type="text" style={this.state.validEmail}
                                               placeholder="" ref={ref => {
                                            this.email = ref
                                        }}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalPassword">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        City
                                    </Col>
                                    <Col sm={10}>
                                        <input className="form-control" type="text" placeholder="Smallville"
                                               ref={ref => {
                                                   this.password = ref
                                               }}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalConfirmPassword">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        State
                                    </Col>
                                    <Col sm={10}>
                                        <input className="form-control" type="text" style={this.state.confirmation}
                                               placeholder=""
                                               ref={ref => {
                                                   this.confirmPass = ref
                                               }}
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalConfirmPassword">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Country
                                    </Col>
                                    <Col sm={10}>
                                        <input className="form-control" type="text" style={this.state.confirmation}
                                               placeholder="Zoolandia"
                                               ref={ref => {
                                                   this.confirmPass = ref
                                               }}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalConfirmPassword">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Zip
                                    </Col>
                                    <Col sm={10}>
                                        <input className="form-control" type="text" style={this.state.confirmation}
                                               placeholder="123456"
                                               ref={ref => {
                                                   this.confirmPass = ref
                                               }}
                                        />
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Table>
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
                        <AgGridColumn field="_id"></AgGridColumn>
                        <AgGridColumn field="userId"></AgGridColumn>
                        <AgGridColumn field="IPFS"></AgGridColumn>
                        <AgGridColumn field="BFTX"></AgGridColumn>
                        <AgGridColumn field="proof" cellRendererFramework={countryCellRenderer}
                                      filterParams={{cellRenderer: Bol.countryCellRenderer, cellHeight:20}}></AgGridColumn>
                    </AgGridReact>
                </div>
            </div>
        )
    }
    static countryCellRenderer(proof)
    {
        return proof[0].hashIdNode;
    }

}
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

export default compose(getTrackerLoader(reactiveMapper), options)(Bol);