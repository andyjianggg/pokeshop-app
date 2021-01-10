import React, { Component } from "react";
import PropTypes from "prop-types";
import PokeIcon from "../images/poke_icon.png";

// Redux
import { connect } from "react-redux";
import { getUserData, logoutUser } from "../redux/actions/userActions";

// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

const styles = {
  card: {
    display: "block",
    position: "fixed",
    backgroundColor: "cyan",
    color: "#985d6a",
  },
  title: {
    position: "relative",
    textAlign: "center",
    marginBottom: 20,
  },
  img: {
    height: 150,
    width: 150,
    margin: "20px 50px 20px 50px",
  },
  innerDiv: {
    border: "1px solid #000000",
    padding: 15,
  },
  cardContent: {
    position: "relative",
    textAlign: "center",
  },
  content: {
    padding: 25,
    objectFit: "cover",
    margin: "auto",
    border: "2px solid #000000",
  },
  button: {
    position: "relative",
    left: 85,
  },
};

class Sidebar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: { authenticated, userInfo },
      cart,
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography variant="h4" className={classes.title}>
            <b>Profile</b>
          </Typography>
          <img src={PokeIcon} alt="pokeball" className={classes.img} />
          <Typography variant="h5" className={classes.title}>
            {authenticated ? <b>{userInfo.handle}</b> : <b>Please log in</b>}
          </Typography>
          <div
            className={classes.innerDiv}
            style={{
              visibility: authenticated ? "visible" : "hidden",
            }}
          >
            <Typography className={classes.cardContent}>
              {userInfo.firstName} {userInfo.lastName}
            </Typography>
            <Typography className={classes.cardContent}>
              Available credits: <b>${userInfo.userCredits}</b>
            </Typography>
            <Typography className={classes.cardContent}>
              Number of items in cart: <b>{cart.length}</b>
            </Typography>
            <Tooltip title="Logout" placement="top">
              <IconButton
                onClick={this.handleLogout}
                className={classes.button}
              >
                <KeyboardReturn color="primary" />
              </IconButton>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  cart: PropTypes.array.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.data.cart,
  UI: state.UI,
});

const mapActionsToProps = {
  getUserData,
  logoutUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Sidebar));
