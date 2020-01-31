import * as React from 'react';
// import { registerRootComponent } from 'expo';
import { StyleSheet, View, Text } from 'react-native';
import Touchable from '@appandflow/touchable';
import QuickPicker from './QuickPicker';

export default class App extends React.Component {
  state = {
    item: {
      value: '1',
      label: 'salut',
    },
  };

  _onPressText = () => {
    QuickPicker.open({
      onChange: item => this.setState({ item }),
      item: this.state.item,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Touchable
          feedback="opacity"
          native={false}
          onPress={this._onPressText}
        >
          <Text>Open up picker, {this.state.item.value}</Text>
          <Text>Open up picker, {this.state.item.label}</Text>
        </Touchable>
        <QuickPicker />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
