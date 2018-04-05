import React from "react";
import {Button} from "material-ui";
import abcui from "airbitz-core-js-ui";

export default  class EdgeTab extends React.Component{
    constructor() {
        super();
        this.LinkEdge = this.LinkEdge.bind(this);
        this.state ={key:"a"}
    }


    LinkEdge() {
        _abcUi = abcui.makeABCUIContext({
            'apiKey': 'c0f8c038bd10d138288ff2bd56dbcb999d22801f',
            'appId': 'com.blockfreight.dashboard',
            'assetsPath': '/packages/node_modules/airbitz-core-js-ui/',
            'vendorName': 'Blockfreight Dashboard',
            'vendorImageUrl': 'https://mydomain.com/mylogo.png'
        });
        _abcUi.openLoginWindow( (error, account)=> {
            //   _account = account;
            //  this.refs.edgekey.value = "test"
            this.setState({key: account.id})
            Meteor.call('LinkEdge', account.id, (error, result) => {
                if (error) {
                    alert(error);
                } else {
                    // alert(result);
                }
            })
        })

    }
    render()
    {
        return(
            <div>
            <input className="form-control" value={this.state.key} type="text" placeholder="Token Key" ref={ref => {this.edgekey = ref}}/>
                                            <Button bsStyle="primary" onClick={this.LinkEdge} >
                                                Link Edge
                                            </Button>
             </div>
        );
    }
}