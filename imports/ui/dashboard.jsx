import React from 'react';
import {Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import {Grid, withStyles} from 'material-ui';
import ChartistGraph from 'react-chartist';
import { AccessTime } from 'material-ui-icons';
//import { emailsSubscriptionChart } from './variables/charts';
//import  ChartCard  from './components/Cards/ChartCard';
import PropTypes from 'prop-types';
import chartCardStyle from "./variables/styles/chartCardStyle";
import { StatsCard } from './components';
import { ContentCopy, Warning, AccountBalance, CompareArrows, Event  } from 'material-ui-icons';
import {RegularCard, P} from "./components";
import Log from "./log.jsx"
//import ChartistGraph from 'react-chartist';
//import { AccessTime } from 'material-ui-icons';
//import { emailsSubscriptionChart } from './variables/charts';
import { ChartCard } from './components';
import dashboardStyle from "./variables/styles/dashboardStyle";

import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart
} from "./variables/charts";


class Dashboard extends React.Component{
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
c()
{
    return (
        <div>
            <Grid container spacing={24}>
                <Grid item xs={8} sm={4}>
                <StatsCard
                    icon={AccountBalance}
                    iconColor="green"
                    title="Escrow"
                    description="$5,323,432"
                    small="USD"
                    statIcon={Warning}
                    statIconColor="danger"
                    statLink={{text: "Lookup...", href: "#pablo"}}
                />
                </Grid>
                <Grid item xs={8} sm={4}>
                <StatsCard
                    icon={CompareArrows}
                    iconColor="orange"
                    title="Containers in transit"
                    description="4"
                    small=""
                    statIcon={Warning}
                    statIconColor="danger"
                    statLink={{text: "Lookup...", href: "#pablo"}}
                />
                </Grid>
                <Grid item xs={8} sm={4}>
                <StatsCard
                    icon={Event}
                    iconColor="blue"
                    title="Pending"
                    description="4"
                    small=""
                    statIcon={Warning}
                    statIconColor="danger"
                    statLink={{text: "Lookup...", href: "#pablo"}}
                />
                </Grid>
                <Log />
                {/*Locations:<br />*/}
                {/*Factory<br />*/}
                {/*First Carrier<br />*/}
                {/*Alongside Ship<br />*/}
                {/*On Board<br />*/}
                {/*Delivered<br />*/}

                {/*<ChartCard*/}
                    {/*chart={*/}
                        {/*<ChartistGraph*/}
                            {/*className="ct-chart"*/}
                            {/*data={emailsSubscriptionChart.data}*/}
                            {/*type="Bar"*/}
                            {/*options={emailsSubscriptionChart.options}*/}
                            {/*responsiveOptions={emailsSubscriptionChart.responsiveOptions}*/}
                            {/*listener={*/}
                                {/*emailsSubscriptionChart.animation*/}
                            {/*}*/}
                        {/*/>*/}
                    {/*}*/}
                    {/*chartColor="orange"*/}
                    {/*title="Email Subscriptions"*/}
                    {/*text="Last Campaign Performance"*/}
                    {/*statIcon={AccessTime}*/}
                    {/*statText="campaign sent 2 days ago"*/}
                {/*/>*/}
                {/*<ChartistGraph*/}
                    {/*className="ct-chart"*/}
                    {/*data={emailsSubscriptionChart.data}*/}
                    {/*type="Bar"*/}
                    {/*options={emailsSubscriptionChart.options}*/}
                    {/*responsiveOptions={emailsSubscriptionChart.responsiveOptions}*/}
                    {/*listener={*/}
                        {/*emailsSubscriptionChart.animation*/}
                    {/*}*/}
                {/*/>*/}
            </Grid>
        </div>
    )
}
    render() {
        return (
            <div  className="mx-auto" style={{width: 1200}} >
                <RegularCard
                    cardTitle="Dashboard"
                    cardSubtitle=""
                    content={this.c()}
                    footer={<P></P>}
                />



            </div>
        )
    }
}
Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};
import appStyle from "./variables/styles/appStyle.jsx";
export default (Dashboard);
