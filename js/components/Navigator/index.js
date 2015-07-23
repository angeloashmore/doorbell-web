import React from 'react';
import Radium from 'radium';

import { Container, Form, Toolbar } from 'elements';

@Radium
export default class extends React.Component {
  static propTypes = {
    views: React.PropTypes.array
  }

  static defaultProps = {
    views: []
  }

  constructor(props) {
    super(props);
    this.state = {
      views: this.props.views,
      title: this.props.title,
      subtitle: this.props.subtitle,
      leftItem: this.props.leftItem,
      rightItem: this.props.rightItem
    };
  }

  setTitle(title) {
    this.setState({ title });
  }

  setSubtitle(subtitle) {
    this.setState({ subtitle });
  }

  setLeftItem(leftItem) {
    this.setState({ leftItem });
  }

  setRightItem(rightItem) {
    this.setState({ rightItem });
  }

  pushView(view) {
    const views = this.state.views.slice(0);
    views.push(view);
    this.setState({ views });
  }

  popView() {
    const views = this.state.views.slice(0);
    views.pop();
    this.setState({ views });
  }

  viewToMount() {
    const { views } = this.state;

    if (views.length > 0) {
      const view = views.slice(-1)[0];
      const props = Object.assign(view.props, { navigator: this });
      return React.cloneElement(view, props);
    }
  }

  renderBackButton() {
    const { views } = this.state;

    if (views.length > 1) {
      return (
        <Toolbar.Item
          iconLeft="left-chevron"
          onClick={this.popView.bind(this)}
          >
          Back
        </Toolbar.Item>
      );
    }
  }

  render() {
    const { views } = this.state;

    return (
      <Container
        style={[
          styles.container,
          this.props.style
        ]}>
        <Form>
          <Toolbar
            title={this.state.title}
            subtitle={this.state.subtitle}
            leftItem={this.state.leftItem || this.renderBackButton()}
            rightItem={this.state.rightItem}
            />

          <Container style={[styles.container, styles.body]}>
            {this.viewToMount()}
          </Container>
        </Form>
      </Container>
    );
  }
}

const styles = {
  container: {
    flexDirection: "column"
  },

  body: {
    overflowY: "auto"
  }
};
