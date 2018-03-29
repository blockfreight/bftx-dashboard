import React from 'react';
import {Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

class Footer extends React.Component {
    constructor() {
        super();
    }
    render()
    {
        return(
            <footer className="footer">
                <div className="container">
                    <span className="text-muted">Copyright Blockfreight</span>
                </div>
            </footer>
        )
    }
}
export default  Footer;