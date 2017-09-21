import React, { Component } from 'react';

import cx from 'classnames';

class Mask extends Component {
  render() {
    const { close, open } = this.props;
    const classNames = cx({
      'mask': true,
      'mask-open': open === 'open'
    });
    return (
      <div className={classNames} onClick={close} onTouchMove={this.prevent}></div>
    );
  }
  prevent = (event) => {
    event.preventDefault();
    event.stopPropagation();
  }
}
export default Mask;
