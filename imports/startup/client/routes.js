import {FlowRouter} from 'meteor/kadira:flow-router';

const authed = () => Meteor.userId() || FlowRouter.go('/');

FlowRouter.route('/', {
    action(){
        if (Meteor.userId()) {
            FlowRouter.go('/dashboard');
        }
        else {
            //mount(SecondApp, {main: <Login />});
        }
    }
});