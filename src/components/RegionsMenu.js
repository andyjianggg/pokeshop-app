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

class RegionsMenu extends Component {
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
      });
    };

    return (
      <Fragment>
        <Button
          aria-controls="region-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClick}
          className={classes.navButtons}
        >
          Regions
        </Button>
        <Menu
          id="region-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            className={classes.menuItem}
            component={Link}
            to="/regions/Kanto"
          >
            Kanto
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            component={Link}
            to="/regions/Johto"
          >
            Johto
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            component={Link}
            to="/regions/Hoenn"
          >
            Hoenn
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            component={Link}
            to="/regions/Sinnoh"
          >
            Sinnoh
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            component={Link}
            to="/regions/Unova"
          >
            Unova
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            component={Link}
            to="/regions/Kalos"
          >
            Kalos
          </MenuItem>
        </Menu>
      </Fragment>
    );
  }
}

export default withStyles(styles)(RegionsMenu);
