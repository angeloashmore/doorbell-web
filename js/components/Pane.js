import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import Color from 'color';

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
    borderRight: `1px solid ${Color(colors.black).alpha(0.1).rgbString()}`,
    paddingLeft: 20,
    width: 240
  }
};
