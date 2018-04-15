import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, withStyles } from "material-ui";

import footerStyle from "../../variables/styles/footerStyle";

function Footer({ ...props }) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          {/*<List className={classes.list}>*/}
            {/*<ListItem className={classes.inlineBlock}>*/}
              {/*<a href="#home" className={classes.block}>*/}
                {/*Home*/}
              {/*</a>*/}
            {/*</ListItem>*/}
            {/*<ListItem className={classes.inlineBlock}>*/}
              {/*<a href="#company" className={classes.block}>*/}
                {/*Company*/}
              {/*</a>*/}
            {/*</ListItem>*/}
            {/*<ListItem className={classes.inlineBlock}>*/}
              {/*<a href="#portfolio" className={classes.block}>*/}
                {/*Portfolio*/}
              {/*</a>*/}
            {/*</ListItem>*/}
            {/*<ListItem className={classes.inlineBlock}>*/}

            {/*</ListItem>*/}
          {/*</List>*/}
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a href="http://www.blockfreight.com" className={classes.a}>
             Blockfreight
            </a>, Decentralized Blockchain global freight
              &nbsp;<a href="https://www.linkedin.com/company/blockfreight/"><i className="fa fa-linkedin"></i></a>
              &nbsp;<a href="https://angel.co/blockfreight"><i className="fa fa-angellist"></i></a>
              &nbsp;<a href="https://medium.com/blockfreight-bft-xcp"><i className="fa fa-medium"></i></a>
              &nbsp;<a href="https://github.com/blockfreight"><i className="fa fa-github"></i></a>
              &nbsp;<a href="https://twitter.com/blockfreight"><i className="fa fa-twitter"></i></a>
              &nbsp;<a href="https://www.reddit.com/r/blockfreight/"><i className="fa fa-reddit"></i></a>
              &nbsp;<a href="https://facebook.com/blockfreight"><i className="fa fa-facebook"></i></a>
          </span>
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
