import React from "react";
import Radium from "radium";

@Radium
export default class extends React.Component {
  render() {
    return (
      <div
        style={[
          styles.body,
          this.props.style
        ]}>
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  body: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto"
  }
}
