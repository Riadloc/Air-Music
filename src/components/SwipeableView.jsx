import React, { Component } from 'react';

import './SwipeableView.styl';

class SwipeableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0
    };
  }
  render() {
    const { value } = this.props;
    const children = 
      this.props.children.map((child, index) => {
        let ref;
        if (index == value) {
          ref = node => {
            this.activeSlide = node;
            this.updateHeight();
          };
        }
        return (<div key={index} ref={ref}>{ child }</div>);
      });
    const styles = {
      transform: `translate(${-100*value}%,0)`,
      height: this.state.height
    };
    return (
      <div className="swipeable-view">
        <div className="swipeable-view-wrapper" style={styles}>
          { children }
        </div> 
      </div>
    );
  }
  
  updateHeight = () => {
    if (this.activeSlide !== null) {
      const child = this.activeSlide.children[0];
      this.setState({height: child.offsetHeight});
      console.log(child, this.height);
    }
  }
  
}
export default SwipeableView;
