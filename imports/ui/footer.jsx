import React from 'react';
import {Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import { SocialIcon } from 'react-social-icons';
class Footer extends React.Component {
    constructor() {
        super();
    }
    render()
    {
        return(
            <footer className="footer">

                <div className="container">
                    <div  style={{float:"left", fontSize:12, verticalAlign: "top"}}>
                    <span className="text-muted">Copyright Blockfreight</span>
                    </div>

                        <div style={{float:"right", fontSize:30, verticalAlign: "top"}}>
                            {/*<SocialIcon url="http://twitter.com/blockfreight" />*/}
                            {/*<SocialIcon url="http://github.com/blockfreight" />*/}
                            {/*<SocialIcon url="http://facebook.com/blockfreight" />*/}
                            {/*<SocialIcon url="https://www.linkedin.com/company/blockfreight/" />*/}
                            {/*<SocialIcon url="http://medium.com/blockfreight-bft-xcp" />*/}
                            {/*<SocialIcon url="https://angel.co/blockfreight" />*/}
                            {/*<SocialIcon url="http://github.com/blockfreight" />*/}

                            &nbsp;<a href="https://www.linkedin.com/company/blockfreight/"><i className="fa fa-linkedin"></i></a>
                            &nbsp;<a href="https://angel.co/blockfreight"><i className="fa fa-angellist"></i></a>
                            &nbsp;<a href="https://medium.com/blockfreight-bft-xcp"><i className="fa fa-medium"></i></a>
                            &nbsp;<a href="https://github.com/blockfreight"><i className="fa fa-github"></i></a>
                            &nbsp;<a href="https://twitter.com/blockfreight"><i className="fa fa-twitter"></i></a>
                            &nbsp;<a href="https://www.reddit.com/r/blockfreight/"><i className="fa fa-reddit"></i></a>
                            &nbsp;<a href="https://facebook.com/blockfreight"><i className="fa fa-facebook"></i></a>
                        </div>
                    </div>

                <div style={{}}>
                </div>
                <br />
                <div>


                </div>
            </footer>
        )
    }
}
export default  Footer;