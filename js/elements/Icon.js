import React from 'react';
import Radium from 'radium';

@Radium
export default class extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    selected: React.PropTypes.bool
  }

  static defaultProps = {
    name: "default",
    selected: false
  }

  render() {
    const src = `/assets/images/icons/${this.props.name}${this.props.selected ? "-selected" : ""}.svg`
    return (
      <img
        {...this.props}
        src={src}
        style={[
          styles.icon,
          this.props.style
        ]}
      />
    );
  }
}

const styles = {
  icon: {
    verticalAlign: "bottom"
  }
};
