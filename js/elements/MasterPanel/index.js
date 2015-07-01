import React from "react";
import Radium from "radium";
import Color from "color";

import Heading from "./Heading";
import Item from "./Item";

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  static Heading = Heading;
  static Item = Item;

  static propTypes = {
    selectedKey: React.PropTypes.string
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedKey: this.props.selectedKey || null
    };
  }

  selectKey(key) {
    this.setState({ selectedKey: key });
  }

  render() {
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        selected: (child.key && this.state.selectedKey == child.key),
        onClick: () => this.selectKey(child.key)
      })
    });

    return (
      <div
        style={[
          styles.masterPanel,
          this.props.style
        ]}
        >
        {children}
      </div>
    );
  }
}

const styles = {
  masterPanel: {
    backgroundColor: colors.get("white"),
    borderRight: `1px solid ${colors.get("shadow")}`,
    flexShrink: 0,
    paddingLeft: 20,
    width: 240
  }
};
