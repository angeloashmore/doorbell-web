import React from 'react';
import Radium from 'radium';

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  render() {
    return (
      <form
        style={styles.form}
        >
        {this.props.children}
      </form>
    );
  }
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column"
  }
}
