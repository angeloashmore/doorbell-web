import React from 'react';
import Radium from 'radium';

import Button from './Button';
import colors from 'styles/colors';

@Radium
export default class extends React.Component {
  static Button = Button;

  static defaultProps = {
    leftButton: <Button />,
    rightButton: <Button />
  }

  render() {
    return (
      <div style={styles.headerBar}>
        <div style={styles.leftButton}>
          {this.props.leftButton}
        </div>

        <div style={styles.titleContainer}>
          <span style={styles.subtitle}>
            {this.props.subtitle}
          </span>

          <span style={styles.title}>
            {this.props.title}
          </span>
        </div>

        <div style={styles.rightButton}>
          {this.props.rightButton}
        </div>
      </div>
    );
  }
}

const styles = {
  headerBar: {
    backgroundColor: colors.get("white"),
    borderBottom: `1px solid ${colors.get("shadow")}`,
    color: colors.get("textPronounced"),
    display: "flex",
    fontSize: 18,
    justifyContent: "space-between"
  },

  titleContainer: {
    alignSelf: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },

  subtitle: {
    color: colors.get("text"),
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase"
  },

  leftButton: {
    alignSelf: "flex-start"
  },

  rightButton: {
    alignSelf: "flex-end"
  }
};
