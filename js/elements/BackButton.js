import React from "react";
import { Navigation } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from "radium";

import { hoverable } from 'decorators';
import Icon from "elements/Icon";
import colors from "styles/colors";

@hoverable
@reactMixin.decorate(Navigation)
@Radium
export default class extends React.Component {
  render() {
    return (
      <div
        {...this.props.hoverableProps}
        onClick={() => this.goBack()}
        style={[
          styles.backButton,
          this.props.style
        ]}
      >
        <Icon name="arrow-left" style={styles.icon} selected={this.props.hovered} />
        Back
      </div>
    );
  }
}

const styles = {
  backButton: {
    alignItems: "center",
    color: colors.get("textUnpronounced"),
    cursor: "pointer",
    display: "flex",
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",

    ":hover": {
      color: colors.get("tint")
    }
  },

  icon: {
    marginRight: 5
  }
};
