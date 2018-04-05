import React from "react"
import {TextField, Grid, Paper}from 'material-ui';
import PropTypes from 'prop-types';
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

class UserInfo extends React.Component{
    constructor() {
        super();
        this.state = {
            validEmail: {},
            confirmation: {}
        };


    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    render()
    {
        const { classes } = this.props;
        return(<div>
            <Grid item xs={8} sm={4}>
                <Paper className={classes.paper}>
                    <TextField
                        id="ponumber"
                        label=" Name"
                        className={classes.textField}
                        value={this.state.ponumber}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    <TextField
                        id="name"
                        label=" Address"
                        className={classes.textField}
                        value={this.state.reqnumber}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    <TextField
                        id="name"
                        label=" Address 2"
                        className={classes.textField}
                        value={this.state.vendorid}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    /><br/>
                    <TextField
                        id="name"
                        label=" City"
                        className={classes.textField}
                        value={this.state.address}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    <TextField
                        id="name"
                        label=" State"
                        className={classes.textField}
                        value={this.state.address2}
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
                    <TextField
                        id="name"
                        label=" Country"
                        className={classes.textField}
                        value={this.state.address2}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                </Paper>
            </Grid>
        </div>)
    }
}
export default withStyles(styles)(UserInfo)
UserInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};