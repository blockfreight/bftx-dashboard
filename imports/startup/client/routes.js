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
import Home from "../../ui/home";
import Services from "../../ui/services";
import Connect from "../../ui/connect";
import Platform from "../../ui/platform";
import Bol from "../../ui/bol";
import Routes from "../../ui/routes";
import Network from "../../ui/network";
const authed = () => Meteor.userId() || FlowRouter.go('/');

FlowRouter.route('/', {
    action(){
        if (Meteor.userId()) {
            FlowRouter.go('/dashboard');
        }
        else {
            mount(Layout, {main: <Connect />});
        }
    }
});
FlowRouter.route('/whitepaper', {
    action(){
        if (Meteor.userId()) {
            window.location.replace('/BlockfreightWhitepaperFinalDraft.pdf');
        }
        else {
            //mount(SecondApp, {main: <Login />});
            window.location.replace( '/BlockfreightWhitepaperFinalDraft.pdf');
        }
    }
});

FlowRouter.route('/home', {
    action(){
        if (Meteor.userId()) {
            FlowRouter.go('/dashboard');
        }
        else {
            mount(Layout, {main: <Home />});
        }
    }
});
FlowRouter.route('/connect', {
    action(){
        if (Meteor.userId()) {
            FlowRouter.go('/dashboard');
        }
        else {
            mount(Layout, {main: <Connect />});
        }
    }
});
FlowRouter.route('/services', {
    action(){
        if (Meteor.userId()) {
            FlowRouter.go('/dashboard');
        }
        else {
            mount(Layout, {main: <Services />});
        }
    }
});
FlowRouter.route('/platform', {
    action(){
        if (Meteor.userId()) {
            FlowRouter.go('/dashboard');
        }
        else {
            mount(Layout, {main: <Platform />});
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
            if (Meteor.userId()) {
                Meteor.logout(()=>{
                    FlowRouter.go('/signup');
                });
            }
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
            FlowRouter.go('/login');
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
            FlowRouter.go('/login');
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
            FlowRouter.go('/login');
        }
    }
});
FlowRouter.route('/network', {
    action(){
        if (Meteor.userId()) {
            mount(Layout, {main:<Network />});
        }
        else {
            //mount(SecondApp, {main: <Login />});
            FlowRouter.go('/login');
        }
    }
});
FlowRouter.route('/transactions', {
    action(){
        if (Meteor.userId()) {
            import Transactions from "../../ui/transactions"
            mount(Layout, {main:<Transactions />});
        }
        else {
            //mount(SecondApp, {main: <Login />});
            FlowRouter.go('/login');
        }
    }
});
FlowRouter.route('/transaction', {
    action(){
        if (Meteor.userId()) {
            import Transaction from "../../ui/transaction"
            mount(Layout, {main:<Transaction />});
        }
        else {
            //mount(SecondApp, {main: <Login />});
            FlowRouter.go('/login');
        }
    }
});
FlowRouter.route('/routes', {
    action(){
        if (Meteor.userId()) {
            mount(Layout, {main:<Routes />});
        }
        else {
            //mount(SecondApp, {main: <Login />});
            FlowRouter.go('/login');
        }
    }
});
FlowRouter.route('/bol' +
    '', {
    action(){
        if (Meteor.userId()) {
            mount(Layout, {main:<Bol/>});
        }
        else {
            FlowRouter.go('/login');
        }
    }
});
FlowRouter.route('/logout', {
    action(){
        if (Meteor.userId()) {
            Meteor.logout(()=>{
                FlowRouter.go('/login');
            });
        }else {
            FlowRouter.go('/login');
        }
    }
});