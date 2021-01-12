import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

// Components
import TypesMenu from "./TypesMenu";
import RegionsMenu from "./RegionsMenu";

// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const styles = (theme) => ({
  ...theme.otherStyles,
});

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      searhValue: "",
    };
  }

  render() {
    const { classes, history } = this.props;

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
          <TypesMenu />
          <RegionsMenu />
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
