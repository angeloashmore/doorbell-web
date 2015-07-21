import React from 'react';
import Radium from 'radium';
import gravatar from 'gravatar';

@Radium
export default class extends React.Component {
  static propTypes = {
    profile: React.PropTypes.object.isRequired
  }

  render() {
    const src = gravatar.url(this.props.profile.email);

    return (
      <img
        {...this.props}
        src={src}
        style={[
          styles.photo,
          this.props.style
        ]}
      />
    );
  }
}

const styles = {
  photo: {
    borderRadius: "50%",
    display: "inline-block"
  }
}
