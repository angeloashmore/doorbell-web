import React from "react";
import Radium from "radium";

@Radium
export default class extends React.Component {
  render() {
    return (
      <div
        style={[
          styles.group,
          this.props.style
        ]}>
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  group: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 45
  }
}
