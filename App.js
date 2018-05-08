import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expo from 'expo';
import Touchable from '@appandflow/touchable';

import QuickPicker from './src/QuickPicker';

export default class App extends React.Component {
  state = {
    selectedLetter: new Date(),
  };

  _onPressText = () => {
    const { selectedLetter } = this.state;
    QuickPicker.open({
      items: ['a', 'b', 'c'],
      selectedValue: new Date(),
      onValueChange: selectedValueFromPicker =>
        this.setState({ selectedLetter: selectedValueFromPicker }),
      // textStyle: { color: 'blue', fontSize: 14 },
      // backgroundColor: 'red',
      useNativeDriver: true,
      // doneButtonTextStyle: { color: 'orange' },
      pickerType: 'date',
      mode: 'time',
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
          <Text>
            Open up picker, selected letter:{' '}
            {this.state.selectedLetter.getTime()}
          </Text>
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
