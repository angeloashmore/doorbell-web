import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import Color from 'color';

import colors from 'styles/colors';

@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedKey: null
    };
  }

  selectKey(key) {
    this.setState({ selectedKey: key });
  }

  render() {
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        selected: (child.key && this.state.selectedKey == child.key),
        onClick: () => this.selectKey(child.key)
      })
    });

    return (
      <div style={styles.pane}>
        {children}
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