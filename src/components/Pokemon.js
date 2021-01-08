import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { handleCart } from "../redux/actions/dataActions";

// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

const typeColours = {
  Fire: "#f6685e",
  Water: "#4dabf5",
  Grass: "#6fbf73",
};

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
    minHeight: 200,
    objectFit: "cover",
  },
  content: {
    flex: 1,
    padding: 25,
    objectFit: "cover",
  },
  actions: {
    flex: 1,
  },
};

class Pokemon extends Component {
  constructor() {
    super();
    this.state = {
      inCart: false,
    };
  }

  handleClick = () => {
    this.state.inCart
      ? this.props.handleCart(this.props.pokemon.pokemonId, "removeCart")
      : this.props.handleCart(this.props.pokemon.pokemonId, "addCart");
    this.setState({
      inCart: !this.state.inCart,
    });
  };

  componentDidMount() {
    const {
      data: { cart },
      authenticated,
    } = this.props;
    let pokemon;
    if (authenticated) {
      for (pokemon of cart) {
        if (pokemon.pokemonId === this.props.pokemon.pokemonId) {
          this.setState({
            inCart: true,
          });
          return;
        }
      }
    }
  }

  render() {
    const { classes, pokemon } = this.props;

    const colour = typeColours[pokemon.type1];

    return (
      <Card className={classes.card} style={{ backgroundColor: `${colour}` }}>
        <CardMedia
          image={pokemon.imageUrl}
          title="Pokemon image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography variant="h5">
            <b>{pokemon.name}</b>
          </Typography>
          <Typography variant="body1">
            <b>{pokemon.type1}</b> type pokemon
          </Typography>
          <Typography variant="body1">
            <b>{pokemon.region}</b> region
          </Typography>
          <Typography variant="body1">
            Cost: <b>${pokemon.cost}</b>
          </Typography>
          <Typography variant="body2">
            This pokemon is {pokemon.nature} in nature.
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={this.handleClick}
            style={{
              visibility: this.props.authenticated ? "visible" : "hidden",
            }}
          >
            {this.state.inCart ? "Remove from Cart" : "Add to Cart"}
          </Button>
        </CardActions>
      </Card>
    );
  }
}

Pokemon.propTypes = {
  classes: PropTypes.object.isRequired,
  handleCart: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  data: state.data,
  UI: state.UI,
});

const mapActionsToProps = {
  handleCart,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Pokemon));
