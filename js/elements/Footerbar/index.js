import React from 'react';
import Radium from 'radium';

import colors from 'styles/colors';

import Button from './Button';
import Link from './Link';

@Radium
export default class extends React.Component {
  static Button = Button;
  static Link = Link;

  render() {
    return (
      <div style={styles.toolbar}>
        <div style={styles.leftItems}>
          {this.props.leftItems}
        </div>

        <div style={styles.rightItems}>
          {this.props.rightItems}
        </div>
      </div>
    );
  }
}

const styles = {
  toolbar: {
    alignItems: "center",
    backgroundColor: colors.get("white"),
    boxShadow: `0 -1px ${colors.get("shadow")}`,
    color: colors.get("text"),
    display: "flex",
    fontSize: 18,
    justifyContent: "space-between",
    position: "relative"
  },

  titleContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    left: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: "100%"
  },

  subtitle: {
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase"
  },

  title: {
    color: colors.get("textPronounced")
  },

  leftItems: {
    display: "flex",
    position: "relative",
    zIndex: 1
  },

  rightItems: {
    display: "flex",
    position: "relative",
    zIndex: 1
  }
};
