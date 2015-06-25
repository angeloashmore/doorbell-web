import React from 'react';

export default function hoverable(Component) {
  return class extends React.Component {
    constructor() {
      super();

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
          hovered={this.state.hovered}
          hoverableProps={this.hoverableProps()}
          />
      );
    }
  }
}
