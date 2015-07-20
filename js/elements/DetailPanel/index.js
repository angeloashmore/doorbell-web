import React from "react";
import Radium from "radium";

import Container from 'elements/Container';
import Body from './Body';
import Group from './Group';
import Heading from './Heading';
import TextPronounced from './TextPronounced';
import p from './p';

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  static Body = Body;
  static Group = Group;
  static Heading = Heading;
  static TextPronounced = TextPronounced;
  static p = p;

  render() {
    return (
      <div style={[
        styles.detailPanel,
        this.props.style
      ]}>
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  detailPanel: {
    backgroundColor: colors.get("background"),
    borderRight: `1px solid ${colors.get("shadow")}`,
    color: colors.get("textPronounced"),
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    minWidth: 400,
    maxWidth: 650,
    width: "50vw"
  }
}
