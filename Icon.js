import React, {Component} from 'react'
import {Text, StyleSheet} from 'react-native'
import Icons from './LinearIcons'

class Icon extends Component {
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps)
  }
  render() {
    const {style, color, name, ...props} = this.props;
    return <Text {...props} style={[styles.icon, {color}, style]} ref={component => this._root = component}>
      {Icons[name]}
    </Text>
  }
}

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'Linearicons',
    backgroundColor: 'transparent'
  }
})

export {Icons}
export default Icon
