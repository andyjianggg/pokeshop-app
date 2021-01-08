import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const styles = {
  navButtons: {
    margin: "auto 30px auto 30px",
  },
  searchField: {
    marginLeft: 100,
  },
  menuItem: {
    margin: "auto 25px auto 25px",
  },
};

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      anchorEl2: null,
      searhValue: "",
    };
  }

  render() {
    const { classes, history } = this.props;

    const handleClickType = (event) => {
      this.setState({
        anchorEl: event.currentTarget,
      });
    };

    const handleClickRegion = (event) => {
      this.setState({
        anchorEl2: event.currentTarget,
      });
    };

    const handleClose = () => {
      this.setState({
        anchorEl: null,
        anchorEl2: null,
      });
    };

    const handleChange = (event) => {
      this.setState({
        ...this.state,
        searchValue: event.target.value,
      });
    };

    const handleSearch = (event) => {
      if (event.key === "Enter") {
        history.push(`/search?q=${this.state.searchValue}`);
      }
    };

    return (
      <AppBar position="fixed">
        <Toolbar className="nav-container">
          <Button
            color="inherit"
            component={Link}
            to="/"
            className={classes.navButtons}
          >
            Home
          </Button>
          <Button
            aria-controls="types-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={handleClickType}
            className={classes.navButtons}
          >
            Types
          </Button>
          <Menu
            id="types-menu"
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
          </Menu>
          <Button
            aria-controls="region-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={handleClickRegion}
            className={classes.navButtons}
          >
            Regions
          </Button>
          <Menu
            id="region-menu"
            anchorEl={this.state.anchorEl2}
            keepMounted
            open={Boolean(this.state.anchorEl2)}
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
          </Menu>
          <Button
            color="inherit"
            component={Link}
            to="/sell"
            className={classes.navButtons}
          >
            Sell
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/cart"
            className={classes.navButtons}
          >
            Cart
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/login"
            className={classes.navButtons}
          >
            Login
          </Button>
          <TextField
            className={classes.searchField}
            id="searchField"
            placeholder="Search"
            onChange={handleChange}
            onKeyPress={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withStyles(styles)(Navbar));
