import React from 'react';
import { Link, RouteHandler } from 'react-router';
import Radium from 'radium';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Navigation from 'components/Navigation';

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
    backgroundColor: colors.gray,
    display: "flex",
    fontFamily: "DIN1451W01-Mittelschrif",
    flexFlow: "column nowrap",
    height: "100%",
    width: "100%"
  },

  header: {
    flexShrink: 0,
    width: "100%"
  },

  body: {
    flexGrow: 1,
    width: "100%"
  }
};
