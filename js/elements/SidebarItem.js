import React from 'react';
import { Link } from 'react-router';

export default class SidebarItem extends React.Component {
  render() {
    return (
      <div>
        <img src="/images/icon-team-selected.png" />
        <span>
          Dower Realty
        </span>
      </div>
    );
  }
}
