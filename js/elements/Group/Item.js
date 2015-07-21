import React from "react";
import Radium from "radium";

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  render() {
    const title = (
      <div style={styles.title}>
        {this.props.title}
      </div>
    );

    return (
      <div
        {...this.props}
        style={[
          styles.item,
          this.props.last && styles.last,
          this.props.style
        ]}>
        {!!this.props.title ? title : ""}

        <div
          style={[
            styles.children,
            !!this.props.title && styles.childrenWithTitle
          ]}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const styles = {
  item: {
    borderBottom: `1px solid ${colors.get("divider")}`,
    display: "flex",
    padding: "16px 20px"
  },

  title: {
    color: colors.get("text"),
    flexShrink: 0,
    marginRight: 20,
    width: 100
  },

  children: {
    alignItems: "center",
    display: "flex",
    flexGrow: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },

  childrenWithTitle: {
    justifyContent: "flex-end",
    textAlign: "right"
  },

  last: {
    borderBottom: 0
  }
}
