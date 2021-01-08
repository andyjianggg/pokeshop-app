import React, { Component } from "react";

// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  card: {
    display: "block",
    position: "fixed",
    width: 300,
    backgroundColor: "cyan",
    color: "#985d6a",
  },
  title: {
    position: "relative",
    textAlign: "center",
  },
  cardActions: {
    padding: "25 25 25 25",
    display: "block",
  },
  content: {
    padding: 25,
    objectFit: "cover",
    margin: "auto",
  },
  button: {
    color: "#985d6a",
    backgroundColor: "#ffef62",
    padding: 20,
  },
};

class Sidebar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography variant="h5" className={classes.title}>
            <b>Regions</b>
          </Typography>
        </CardContent>
        <Button variant="contained" fullWidth={true} className={classes.button}>
          Kanto
        </Button>
        <Button variant="contained" fullWidth={true} className={classes.button}>
          Hoenn
        </Button>
        <Button variant="contained" fullWidth={true} className={classes.button}>
          Sinnoh
        </Button>
      </Card>
    );
  }
}

export default withStyles(styles)(Sidebar);
