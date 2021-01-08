import React, { Component } from "react";
import jwtDecode from "jwt-decode";

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
      disableButton: true,
    };
  }

  handleClick = (event) => {
    const token = localStorage.userIdToken;
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.email;
    let cart = JSON.parse(localStorage.getItem(userEmail) || "[]");
    cart.push(this.props.pokemon);
    localStorage.setItem(userEmail, JSON.stringify(cart));
    const item = localStorage.getItem(userEmail);
    const parsedItem = JSON.parse(item);
    this.setState({
      disableButton: true,
    });
  };

  componentDidMount() {
    const userEmail = localStorage.userEmail;
    let pokemon;
    if (userEmail) {
      const cart = JSON.parse(localStorage.getItem(userEmail) || "[]");
      for (pokemon of cart) {
        if (pokemon.pokemonId === this.props.pokemon.pokemonId) {
          return;
        }
      }
      this.setState({
        disableButton: false,
      });
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
            disabled={this.state.disableButton}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Pokemon);
