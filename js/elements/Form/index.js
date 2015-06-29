import React from "react";
import Radium from "radium";

import Label from "./Label";
import Input from "./Input";
import Button from "./Button";

@Radium
export default class extends React.Component {
  static Label = Label;
  static Input = Input;
  static Button = Button;

  render() {
    return (
      <form
        style={[
          styles.form,
          this.props.style
        ]}
      >
        {this.props.children}
      </form>
    );
  }
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column"
  }
};
