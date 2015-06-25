import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

import SidebarItem from 'elements/SidebarItem';

@Radium
export default class Header extends React.Component {
  render() {
    return (
      <div style={styles.sidebar}>
        <h5>Teams</h5>
        <SidebarItem />
      </div>
    );
  }
}

const styles = {
  sidebar: {
    display: "flex",
    overflowY: "scroll"
  }
};
