import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

class Header extends Component {
  render() {
    const styles = {
      tabs: { backgroundColor: '#fff' },
      tab: { color: '#111' }
    };
    const { handleTabChange, activeTab } = this.props;
    return (
      <div>
        <div className="header">
          <div className="log-bar">
            <i className="iconfont icon-changpian"></i>
            <span className="log-bar--title">AiR音乐</span>
          </div>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            inkBarStyle={{transitionDuration: '.5s'}}
            tabItemContainerStyle={{...styles.tabs}}>
            <Tab buttonStyle={{...styles.tab}} label="音乐馆" value={0} />
            <Tab buttonStyle={{...styles.tab}} label="排行榜" value={1} />
            <Tab buttonStyle={{...styles.tab}} label="搜索" value={2} />
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Header;
