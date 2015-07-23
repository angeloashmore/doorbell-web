import React from 'react';
import Radium from 'radium';

import { hoverable } from 'decorators';
import colors from "styles/colors";

import { Container, Icon } from 'elements';

@hoverable
@Radium
export default class extends React.Component {
  static defaultProps = {
    elType: "span"
  }

  renderContent() {
    const { hovered, icon, iconLeft, iconRight } = this.props;

    if (!!icon) {
      return <Icon name={icon} selected={hovered} />;
    }

    return (
      <Container>
        {!!iconLeft ? (
          <Icon name={iconLeft} selected={hovered} style={styles.iconLeft} />
        ) : ""}

        <span style={styles.children}>
          {this.props.children}
        </span>

        {!!iconRight ? (
          <Icon name={iconRight} selected={hovered} style={styles.iconRight} />
        ) : ""}
      </Container>
    );
  }

  render() {
    const { elType, hoverableProps, disabled } = this.props;

    const props = Object.assign(
      {...this.props},
      {...hoverableProps},
      {
        style: [
          styles.item,
          disabled && styles.disabled,
          this.props.style
        ]
      }
    );

    return React.createElement(elType, props, this.renderContent());
  }
}

const styles = {
  item: {
    color: colors.get("tint"),
    cursor: "pointer",
    display: "flex",
    lineHeight: "100%",
    padding: 20,
    textDecoration: "none",
    verticalAlign: "bottom",

    ":hover": {
      color: colors.get("tintAlt")
    }
  },

  disabled: {
    color: colors.get("textUnpronounced"),
    cursor: "auto",

    ":hover": {
      color: colors.get("textUnpronounced")
    }
  },

  iconRight: {
    marginLeft: 5
  },

  iconLeft: {
    marginRight: 5
  }
}
