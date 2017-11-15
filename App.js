import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expo from 'expo';
import Touchable from '@appandflow/touchable';

import QuickPicker from './src/QuickPicker';

export default class App extends React.Component {
  state = {
    selectedLetter: new Date()
  }

  _onPressText = () => {
    const { selectedLetter } = this.state;
    QuickPicker.open({
        items: ['a', 'b', 'c','d', 'e', 'f','g', 'h1', 'i2','a3', 'b5', 'c6','d7', 'e8', 'f9','g1', 'h1', '1i'],
        selectedValue: 'a',
        onValueChange: (selectedValueFromPicker) => this.setState({ selectedLetter: selectedValueFromPicker }),
        // textStyle: { color: 'blue', fontSize: 14 },
        // backgroundColor: 'red',
        useNativeDriver: true,
        // doneButtonTextStyle: { color: 'orange' },
        pickerType: 'multi',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Touchable feedback="opacity" native={false} onPress={this._onPressText}>
          <Text>Open up picker, selected letter: {this.state.selectedLetter.getTime()}</Text>
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


Expo.registerRootComponent(App);