import React from 'react';

export default function hoverable(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        hovered: false
      };
    }

    handleMouseEnter() {
      this.setState({ hovered: true });
    }

    handleMouseLeave() {
      this.setState({ hovered: false });
    }

    hoverableProps() {
      return {
        onMouseEnter: () => this.handleMouseEnter(),
        onMouseLeave: () => this.handleMouseLeave()
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          hovered={this.state.hovered}
          hoverableProps={this.hoverableProps()}
          />
      );
    }
  }
}
