import React from "react";
import Radium from "radium";

import Container from 'elements/Container';
import Heading from './Heading';
import TextPronounced from './TextPronounced';

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  static Heading = Heading;
  static TextPronounced = TextPronounced;

  render() {
    return (
      <Container style={[
        styles.panel,
        this.props.style
      ]}>
        {this.props.children}
      </Container>
    );
  }
}

const styles = {
  panel: {
    padding: 45
  }
};
