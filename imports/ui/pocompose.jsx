import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from "material-ui/Button"
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

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];
let id = 0;
function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}
const data = [
    createData('Bike Frames', 159, 6.0, 24, 4.0),
    createData('Tires', 237, 9.0, 37, 4.3),
    createData('Spokes', 262, 16.0, 24, 6.0),
];

class POCompose extends React.Component {
    state = {
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <div>
                    <Grid container spacing={24}>
                        <Grid item xs={8} sm={4}>
                            <Paper className={classes.paper}>
                                <TextField
                                    id="ponumber"
                                    label="Purchase Order Number"
                                    className={classes.textField}
                                    value={this.state.ponumber}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Requisition Number"
                                    className={classes.textField}
                                    value={this.state.reqnumber}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Vendor ID"
                                    className={classes.textField}
                                    value={this.state.vendorid}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                /><br/>
                                <TextField
                                    id="name"
                                    label="Address"
                                    className={classes.textField}
                                    value={this.state.address}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Address2"
                                    className={classes.textField}
                                    value={this.state.address2}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Paper className={classes.paper}><TextField
                                id="ponumber"
                                label="Contact"
                                className={classes.textField}
                                value={this.state.ponumber}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                                <TextField
                                    id="name"
                                    label="Telephone"
                                    className={classes.textField}
                                    value={this.state.reqnumber}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Fax"
                                    className={classes.textField}
                                    value={this.state.vendorid}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                /><br/>

                            </Paper>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Paper className={classes.paper}><TextField
                                id="ponumber"
                                label="Purchase Order Number"
                                className={classes.textField}
                                value={this.state.ponumber}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                                <TextField
                                    id="name"
                                    label="Requisition Number"
                                    className={classes.textField}
                                    value={this.state.reqnumber}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Vendor ID"
                                    className={classes.textField}
                                    value={this.state.vendorid}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                /><br/>
                                <TextField
                                    id="name"
                                    label="Address"
                                    className={classes.textField}
                                    value={this.state.address}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Address2"
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
                                    label="Order Date"
                                    className={classes.textField}
                                    value={this.state.ponumber}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Date Required"
                                    className={classes.textField}
                                    value={this.state.reqnumber}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Delivery Promised By"
                                    className={classes.textField}
                                    value={this.state.vendorid}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                /><br/>
                                <TextField
                                    id="name"
                                    label="Dont Deliver Before"
                                    className={classes.textField}
                                    value={this.state.address}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Receipt Date"
                                    className={classes.textField}
                                    value={this.state.address2}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Vendor Ship Via"
                                    className={classes.textField}
                                    value={this.state.address2}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Freight Terms"
                                    className={classes.textField}
                                    value={this.state.address2}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Terms Code"
                                    className={classes.textField}
                                    value={this.state.address2}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Free On Board"
                                    className={classes.textField}
                                    value={this.state.address2}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Acknowledged By"
                                    className={classes.textField}
                                    value={this.state.address2}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                            </Paper>

                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Paper className={classes.paper}><TextField
                                id="ponumber"
                                label="PO Standard Message Code"
                                className={classes.textField}
                                value={this.state.ponumber}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                                <TextField
                                    id="name"
                                    label="Ship To Wherehouse"
                                    className={classes.textField}
                                    value={this.state.reqnumber}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Warehouse Address"
                                    className={classes.textField}
                                    value={this.state.vendorid}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                /><br/>
                                <TextField
                                    id="name"
                                    label="Warehouse Address 2"
                                    className={classes.textField}
                                    value={this.state.address}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Warehouse City"
                                    className={classes.textField}
                                    value={this.state.address2}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Warehouse State"
                                    className={classes.textField}
                                    value={this.state.address2}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Warehouse Zip"
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
                                    id="name"
                                    label="Ship To Vendor"
                                    className={classes.textField}
                                    value={this.state.reqnumber}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Vendor Address"
                                    className={classes.textField}
                                    value={this.state.vendorid}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                /><br/>
                                <TextField
                                    id="name"
                                    label="Vendor Address 2"
                                    className={classes.textField}
                                    value={this.state.address}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Vendor City"
                                    className={classes.textField}
                                    value={this.state.address2}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Vendor State"
                                    className={classes.textField}
                                    value={this.state.address2}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Vendor Zip"
                                    className={classes.textField}
                                    value={this.state.address2}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={24} sm={24} className={classes.grid}>
                            <Paper className={classes.papertable}>
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
                        </Grid>
                    </Grid>
                    <Grid item xs={8} sm={4}>

                        <Button bsStyle="primary"  >
                            Send
                        </Button>
                        <Button className="btn-mrg"  >
                            Done
                        </Button>
                    </Grid>
                </div>


            </form>
        );
    }
}

POCompose.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(POCompose);