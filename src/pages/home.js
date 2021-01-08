import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";

// MUI
import Grid from "@material-ui/core/Grid";

// Components
import Pokemon from "../components/Pokemon";
import Sidebar from "../components/Sidebar";

import { getPokemon } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getPokemon();
  }
  render() {
    const { pokemon, loading } = this.props.data;
    const currType = this.props.match.params.type
      ? this.props.match.params.type
      : "";
    const currRegion = this.props.match.params.region
      ? this.props.match.params.region
      : "";
    const token = localStorage.userIdToken;
    let pokemonCart = [];
    if (token) {
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.email;
      pokemonCart = JSON.parse(localStorage.getItem(userEmail) || "[]");
    }

    let pokemonDisplay = !loading ? (
      pokemon.map((pokemon) => (
        <Pokemon key={pokemon.pokedexId} pokemon={pokemon} />
      ))
    ) : (
      <p>Loading...</p>
    );

    let pokemonDisplayType = !loading ? (
      pokemon.map((pokemon) => {
        if (pokemon.type1 === currType) {
          return <Pokemon key={pokemon.pokedexId} pokemon={pokemon} />;
        }
      })
    ) : (
      <p>Loading...</p>
    );

    let pokemonDisplayRegion = !loading ? (
      pokemon.map((pokemon) => {
        if (pokemon.region === currRegion) {
          return <Pokemon key={pokemon.pokedexId} pokemon={pokemon} />;
        }
      })
    ) : (
      <p>Loading...</p>
    );

    let pokemonDisplaySearch = !loading ? (
      pokemon.map((pokemon) => {
        let searchKey = "";
        if (this.props.location.search) {
          const query = new URLSearchParams(this.props.location.search);
          const searchValue = query.get("q");
          const firstLetter = searchValue.charAt(0).toUpperCase();
          searchKey = firstLetter + searchValue.substring(1);
        }
        if (
          searchKey.length <= pokemon.name.length &&
          (pokemon.name === searchKey ||
            pokemon.name.substring(0, searchKey.length) === searchKey)
        ) {
          return <Pokemon key={pokemon.pokedexId} pokemon={pokemon} />;
        }
      })
    ) : (
      <p>Loading...</p>
    );

    let pokemonDisplayCart = !loading ? (
      pokemonCart.map((pokemon) => (
        <Pokemon key={pokemon.pokedexId} pokemon={pokemon} />
      ))
    ) : (
      <p>Loading...</p>
    );

    return (
      <Grid container spacing={2}>
        <Grid item sm={9} xs={12}>
          {this.props.match.params.type
            ? pokemonDisplayType
            : this.props.match.params.region
            ? pokemonDisplayRegion
            : window.location.pathname === "/"
            ? pokemonDisplay
            : window.location.pathname === "/cart"
            ? pokemonDisplayCart
            : pokemonDisplaySearch}
        </Grid>
        <Grid item sm={3} xs={12}>
          <Sidebar />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getPokemon: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getPokemon })(home);
