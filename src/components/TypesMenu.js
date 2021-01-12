import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

// MUI
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.otherStyles,
});

class TypesMenu extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
    };
  }

  render() {
    const { classes } = this.props;

    const handleClick = (event) => {
      this.setState({
        anchorEl: event.currentTarget,
      });
    };

    const handleClose = () => {
      this.setState({
        anchorEl: null,
        anchorEl2: null,
      });
    };

    return (
      <Fragment>
        <Button
          aria-controls="types-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClick}
          className={classes.navButtons}
        >
          Types
        </Button>
        <Menu
          id="types-menu"
          className={classes.menu}
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            className={classes.menuItem}
            component={Link}
            to="/types/Fire"
          >
            Fire
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            component={Link}
            to="/types/Water"
          >
            Water
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            component={Link}
            to="/types/Grass"
          >
            Grass
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            component={Link}
            to="/types/Electric"
          >
            Electric
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            component={Link}
            to="/types/Fighting"
          >
            Fighting
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            component={Link}
            to="/types/Normal"
          >
            Normal
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            component={Link}
            to="/types/Psychic"
          >
            Psychic
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            component={Link}
            to="/types/Dark"
          >
            Dark
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            component={Link}
            to="/types/Dragon"
          >
            Dragon
          </MenuItem>
        </Menu>
      </Fragment>
    );
  }
}

export default withStyles(styles)(TypesMenu);
