import React from 'react';
import Radium from 'radium';

import Button from './Button';
import colors from 'styles/colors';

@Radium
export default class extends React.Component {
  static Button = Button;

  render() {
    return (
      <div style={styles.toolbar}>
        <div style={styles.leftItem}>
          {this.props.leftItem}
        </div>

        <div style={styles.titleContainer}>
          <span style={styles.subtitle}>
            {this.props.subtitle}
          </span>

          <span style={styles.title}>
            {this.props.title}
          </span>
        </div>

        <div style={styles.rightItem}>
          {this.props.rightItem}
        </div>
      </div>
    );
  }
}

const styles = {
  toolbar: {
    backgroundColor: colors.get("white"),
    boxShadow: `0 0 0 1px ${colors.get("shadow")}`,
    display: "flex",
    fontSize: 18,
    justifyContent: "space-between",
    minHeight: 58
  },

  titleContainer: {
    alignSelf: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },

  subtitle: {
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase"
  },

  title: {
    color: colors.get("textPronounced"),
  },

  leftItem: {
    alignSelf: "flex-start"
  },

  rightItem: {
    alignSelf: "flex-end"
  }
};
