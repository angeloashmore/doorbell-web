import React from "react";
import { Link, State } from "react-router";
import reactMixin from "react-mixin";
import Radium from "radium";

import hoverable from "decorators/hoverable";

import colors from "styles/colors";

@hoverable
@reactMixin.decorate(State)
@Radium
export default class extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    icon: React.PropTypes.string,
    selected: React.PropTypes.bool,

    to: React.PropTypes.string.isRequired,
    params: React.PropTypes.object,
    query: React.PropTypes.object,

    onClick: React.PropTypes.func,

    style: React.PropTypes.object
  }

  static defaultProps = {
    icon: "default",
    selected: false
  }

  selected() {
    return (
      !!this.props.hovered ||
      !!this.props.selected ||
      this.isActive(this.props.to, this.props.params, this.props.query)
    );
  }

  icon() {
    const selected = (this.selected() ? "-selected" : "");
    const src = `/assets/images/icons/${this.props.icon}${selected}.svg`;
    return <img src={src} width="25" height="25" style={this.styles().icon} />;
  }

  render() {
    return (
      <li
        style={[
          this.styles().item,
          this.props.style
        ]}
        >
        <Link
          {...this.props.hoverableProps}
          to={this.props.to}
          params={this.props.params}
          query={this.props.query}
          onClick={this.props.onClick}
          style={this.styles().link}
          >
          {this.icon()}
          <span style={this.styles().title}>{this.props.title}</span>
        </Link>
      </li>
    );
  }

  styles() {
    return {
      item: {
        borderBottom: (this.props.last ? null : `1px solid ${colors.get("divider")}`)
      },

      link: {
        alignItems: "center",
        color: (this.selected() ? colors.get("tint") : null),
        display: (this.props.iconOnly ? "inline-flex" : "flex"),
        margin: (this.props.iconOnly ? "16px 16px 16px 0" : null),
        padding: (this.props.iconOnly ? null : "16px 16px 16px 0"),
        textDecoration: "none"
      },

      icon: {
        display: "block",
        flexShrink: 0,
        height: 25,
        marginRight: (this.props.iconOnly ? null : 10),
        width: 25
      },

      title: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }
    };
  }
}
