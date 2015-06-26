import React from 'react';
import { Link, RouteHandler } from 'react-router';
import Radium from 'radium';

import Header from 'components/Header';

import colors from 'styles/colors';

@Radium
export default class extends React.Component {
  render() {
    return (
      <div style={styles.app}>
        <div style={styles.header}>
          <Header />
        </div>
        <div style={styles.body}>
          <RouteHandler />
        </div>
      </div>
    );
  }
}

const styles = {
  app: {
    alignItems: "stretch",
    backgroundColor: colors.gray__light,
    color: colors.gray,
    display: "flex",
    flexFlow: "column nowrap",
    fontSize: 16,
    height: "100%",
    width: "100%"
  },

  header: {
    flexShrink: 0,
    width: "100%"
  },

  body: {
    display: "flex",
    flexGrow: 1,
    width: "100%"
  }
};
