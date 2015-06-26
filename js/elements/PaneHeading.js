import React from 'react';
import Radium from 'radium';

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  render() {
    return (
      <span style={styles.heading}>
        {this.props.children}
      </span>
    );
  }
}

const styles = {
  heading: {
    color: colors.gray,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase"
  }
}
