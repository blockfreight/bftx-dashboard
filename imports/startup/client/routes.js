import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';
import React from 'react';
import Login from '/imports/ui/login'
import Layout from '/imports/ui/layout'

const authed = () => Meteor.userId() || FlowRouter.go('/');

FlowRouter.route('/', {
    action(){
        if (Meteor.userId()) {
            FlowRouter.go('/dashboard');
        }
        else {
            //mount(SecondApp, {main: <Login />});
            FlowRouter.go('/login');
        }
    }
});
FlowRouter.route('/login', {
    action(){
        if (Meteor.userId()) {
            FlowRouter.go('/dashboard');
        }
        else {
            mount(Layout, {main: <Login />});

        }
    }
});