import React, { Component } from 'react';
import cx from 'classnames';

import './BottomSheet.styl';

class BottomSheet extends Component {
  render() {
    const { title, playlist, play, open } = this.props;
    const classNames = cx({
      'bottomsheet': true,
      'bs-open': open === 'open'
    });
    const items = playlist.map((item, index) => {
      return (
        <li key={index} onClick={() => play(index)}>
          {item.name}
          <div className="divider"></div>
        </li>
      );
    });
    return (
      <div className={classNames}>
        <div className="bottomsheet-head clearfix">
          <h2>{ title }</h2>
        </div>
        <ul className="bottomsheet-list">
          { items }
        </ul>
      </div>
    );
  }
}

export default BottomSheet;
