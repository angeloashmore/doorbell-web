import React from "react";
import Radium from "radium";

import Button from "./Button";
import Input from "./Input";
import Label from "./Label";
import Select from "./Select";

@Radium
export default class extends React.Component {
  static Button = Button;
  static Input = Input;
  static Label = Label;
  static Select = Select;

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
