import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';
import React from 'react';
import Login from '/imports/ui/login'
import Layout from '/imports/ui/layout'
import SignUp from "../../ui/signup";
import Payment from "../../ui/payment"
import Dashboard from "../../ui/dashboard"
import Messages from "../../ui/messages";
import Profile from "../../ui/profile";

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
FlowRouter.route('/signup', {
    action(){
        if (Meteor.userId()) {
            FlowRouter.go('/signup');
        }
        else {
            mount(Layout, {main: <SignUp />});

        }
    }
});

FlowRouter.route('/dashboard', {
    action(){
        if (Meteor.userId()) {
            mount(Layout, {main: <Dashboard />});
        }
        else {
            //mount(SecondApp, {main: <Login />});
            FlowRouter.go('/login');
        }
    }
});
FlowRouter.route('/payment' +
    '', {
    action(){
        if (Meteor.userId()) {
            mount(Layout, {main: <Payment />});
        }
        else {
            FlowRouter.go('/signup');


        }
    }
});
FlowRouter.route('/messages' +
    '', {
    action(){
        if (Meteor.userId()) {
            mount(Layout, {main: <Messages/>});
        }
        else {
            FlowRouter.go('/signup');


        }
    }
});
FlowRouter.route('/profile' +
    '', {
    action(){
        if (Meteor.userId()) {
            mount(Layout, {main: <Profile/>});
        }
        else {
            FlowRouter.go('/signup');


        }
    }
});
FlowRouter.route('/logout', {
    action(){
        if (Meteor.userId()) {
            Meteor.loggingOut();
            FlowRouter.go('/');
        }

    }
});