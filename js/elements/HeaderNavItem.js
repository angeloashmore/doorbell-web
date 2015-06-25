import React from 'react';
import { Link, State } from 'react-router';
import Radium from 'radium';
import reactMixin from 'react-mixin';

import colors from "styles/colors";

@reactMixin.decorate(State)
@Radium
export default class extends React.Component {
  renderRawChildren() {
    return (
      <li style={styles.item}>
        <div
          {...this.props}
          style={[
            styles.link,
            this.props.first && styles.first,
            this.props.last && styles.last,
            this.props.style
          ]}>
          {this.props.children}
        </div>
      </li>
    );
  }

  renderWithLink() {
    return (
      <li style={styles.item}>
        <Link
          {...this.props}
          style={[
            styles.link,
            this.props.first && styles.first,
            this.props.last && styles.last,
            this.isActive(this.props.to, this.props.params, this.props.query) && styles.active
          ]}>
          <div>{this.props.children}</div>
        </Link>
      </li>
    );
  }

  render() {
    return this.props.link ? this.renderWithLink() : this.renderRawChildren();
  }
}

const styles = {
  item: {
    alignContent: "stretch",
    display: "flex",
  },

  link: {
    alignItems: "center",
    color: colors.red__dark,
    display: "flex",
    lineHeight: "100%",
    padding: "0 10px",
    textDecoration: "none",

    ":hover": {
      color: colors.white
    }
  },

  first: {
    paddingLeft: 20
  },

  last: {
    paddingRight: 20
  },

  active: {
    color: colors.white
  }
}
