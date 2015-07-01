import React from 'react';
import Radium from 'radium';

@Radium
export default class extends React.Component {
  render() {
    return (
      <div
        style={[
          styles.container,
          this.props.style
        ]}
        >
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  }
};
