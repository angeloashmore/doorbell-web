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
    display: "block",
    fontSize: 10,
    letterSpacing: 1,
    marginTop: 20,
    overflow: "hidden",
    paddingRight: 20,
    textOverflow: "ellipsis",
    textTransform: "uppercase",
    whiteSpace: "nowrap"
  }
}
