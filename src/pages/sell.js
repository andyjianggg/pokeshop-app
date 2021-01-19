import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import PokeIcon from "../images/poke_icon.png";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { addOnePokemon } from "../redux/actions/dataActions";

//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  ...theme.otherStyles,
});

class sell extends Component {
  constructor() {
    super();
    this.state = {
      pokemonName: "",
      pokedexId: "",
      pokemonType: "",
      pokemonRegion: "",
      pokemonPrice: 0,
      pokemonNature: "",
      pokemonImage: "",
      errors: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleImage = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.setState({
      pokemonImage: formData,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const pokemonData = {
      name: this.state.pokemonName,
      type1: this.state.pokemonType,
      region: this.state.pokemonRegion,
      nature: this.state.pokemonNature,
      cost: this.state.pokemonPrice,
      pokedexId: this.state.pokedexId,
    };
    this.props.addOnePokemon(
      pokemonData,
      this.state.pokemonImage,
      this.props.history
    );
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={PokeIcon} alt="pokeball" className={classes.img} />
          <Typography variant="h2" className={classes.pageTitle}>
            Sell
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="pokemonName"
              name="pokemonName"
              type="text"
              label="Name"
              className={classes.textField}
              value={this.state.pokemonName}
              onChange={this.handleChange}
              fullWidth
              required
            />
            <TextField
              id="pokedexId"
              name="pokedexId"
              type="text"
              label="Pokedex ID"
              className={classes.textField}
              value={this.state.pokedexId}
              onChange={this.handleChange}
              fullWidth
              required
            />
            <TextField
              id="pokemonType"
              name="pokemonType"
              type="text"
              label="Type"
              className={classes.textField}
              value={this.state.pokemonType}
              onChange={this.handleChange}
              fullWidth
              required
            />
            <TextField
              id="pokemonRegion"
              name="pokemonRegion"
              type="text"
              label="Region"
              className={classes.textField}
              value={this.state.pokemonRegion}
              onChange={this.handleChange}
              fullWidth
              required
            />
            <TextField
              id="pokemonPrice"
              name="pokemonPrice"
              type="text"
              label="Price"
              className={classes.textField}
              value={this.state.pokemonPrice}
              onChange={this.handleChange}
              fullWidth
              required
            />
            <TextField
              id="pokemonNature"
              name="pokemonNature"
              type="text"
              label="Nature"
              className={classes.textField}
              value={this.state.pokemonNature}
              onChange={this.handleChange}
              fullWidth
              required
            />
            <TextField
              id="pokemonImage"
              name="pokemonImage"
              type="file"
              helperText="Image"
              className={classes.textField}
              onChange={this.handleImage}
              fullWidth
              required
            />
            {errors.error && (
              <Typography variant="body2" className={classes.customError}>
                {errors.error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Post for sale
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

sell.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  addOnePokemon: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  addOnePokemon,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(sell));
