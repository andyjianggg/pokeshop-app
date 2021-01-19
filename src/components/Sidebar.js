import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import PokeIcon from "../images/poke_icon.png";

// Redux
import { connect } from "react-redux";
import { getUserData, logoutUser } from "../redux/actions/userActions";
import { checkout } from "../redux/actions/dataActions";

// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
  buttonDiv: {
    textAlign: "center",
  },
  buttonCheckout: {
    margin: "20px 20px",
  },
};

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      dialogOpen: false,
      dialogBadOpen: false,
    };
  }

  handleLogout = () => {
    this.props.logoutUser();
  };

  handleClose = () => {
    this.setState({
      dialogOpen: false,
      dialogBadOpen: false,
    });
    this.props.history.push("/");
  };

  handleBadClose = () => {
    this.setState({
      dialogOpen: false,
      dialogBadOpen: false,
    });
  };

  handleCheckout = () => {
    let totalCost = 0;
    let pokemon;
    for (pokemon of this.props.cart) {
      totalCost = totalCost + pokemon.cost;
    }
    const purchaseDiff = this.props.user.userInfo.userCredits - totalCost;
    if (purchaseDiff >= 0) {
      this.props.checkout();
      this.setState({
        dialogOpen: true,
      });
    } else {
      this.setState({
        dialogBadOpen: true,
      });
    }
  };

  render() {
    const {
      classes,
      user: { authenticated, userInfo },
      cart,
    } = this.props;

    let totalCost = 0;
    let pokemon;
    for (pokemon of cart) {
      totalCost = totalCost + parseInt(pokemon.cost);
    }
    const purchaseDiff = userInfo.userCredits - totalCost;

    let sidebarDisplay =
      window.location.pathname === "/cart" ? (
        <div
          className={classes.innerDiv}
          style={{
            visibility: authenticated ? "visible" : "hidden",
          }}
        >
          <Typography className={classes.cardContentCart}>
            Number of items in cart: <b>{cart.length}</b>
          </Typography>
          <Typography className={classes.cardContentCart}>
            Available credits: <b>${userInfo.userCredits}</b>
          </Typography>
          <Typography className={classes.cardContentCart}>
            Total cost of items: <b>${totalCost}</b>
          </Typography>
          <hr />
          <Typography className={classes.cardContentCart}>
            Credits leftover: <b>${purchaseDiff}</b>
          </Typography>
          <div className={classes.buttonDiv}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.buttonCheckout}
              onClick={this.handleCheckout}
            >
              Checkout
            </Button>
            <Dialog
              open={this.state.dialogOpen}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Checkout complete!"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Your purchase has been processed and completed. Thank you for
                  shopping at PokeShop!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button component={Link} to="/" color="primary" autoFocus>
                  Continue shopping
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={this.state.dialogBadOpen}
              onClose={this.handleBadClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Unable to checkout!"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Your purchase has not been processed due to insufficient
                  credits. Please add more credits and try again.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleBadClose} color="primary" autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      ) : (
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
          <div className={classes.buttonDiv}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                onClick={this.handleLogout}
                className={classes.button}
              >
                <KeyboardReturn color="primary" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      );

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
          {sidebarDisplay}
        </CardContent>
      </Card>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
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
  checkout,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(withStyles(styles)(Sidebar)));
