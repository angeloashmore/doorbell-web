import React from 'react';
import Radium from 'radium';
import gravatar from 'gravatar';

@Radium
export default class extends React.Component {
  static propTypes = {
    team_member: React.PropTypes.object.isRequired
  }

  render() {
    const src = gravatar.url(this.props.team_member.email);

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
