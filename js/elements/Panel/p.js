import React from "react";
import Radium from "radium";

@Radium
export default class extends React.Component {
  render() {
    return (
      <div
        style={[
          styles.p,
          this.props.tyle
        ]}>
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  p: {
    margin: "10px 0"
  }
}
