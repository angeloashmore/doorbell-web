import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

import colors from 'styles/colors';

@Radium
export default class extends React.Component {
  render() {
    return (
      <div style={styles.sheet}>
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  sheet: {
    backgroundColor: colors.white,
    padding: 45,
    width: 260
  }
};
