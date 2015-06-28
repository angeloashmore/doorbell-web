import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

import colors from 'styles/colors';

@Radium
export default class extends React.Component {
  render() {
    return (
      <div style={styles.pane}>
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  pane: {
    backgroundColor: colors.white,
    borderRight: `1px solid ${colors.gray__light}`,
    paddingLeft: 20,
    width: 240
  }
};
