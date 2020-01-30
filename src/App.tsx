import * as React from 'react';
// import { registerRootComponent } from 'expo';
import { StyleSheet, View, Text } from 'react-native';
import Touchable from '@appandflow/touchable';
import QuickPicker from './QuickPickerv2';

export default class App extends React.Component {
  state = {
    selectedLetter: new Date(),
  };

  _onPressText = () => {
    QuickPicker.open();
    /*
    const { selectedLetter } = this.state;
    QuickPicker.open({
      // items: ["a", "b", "c"],
      mode: 'datetime',
      pickerType: 'date',
      selectedValue: this.state.selectedLetter,
      doneButtonText: 'Save',
      onValueChange: selectedValueFromPicker =>
        this.setState({ selectedLetter: selectedValueFromPicker }),
      useNativeDriver: true,
      itemStyleAndroid: {
        color: 'grey',
        padding: 10,
      },
      selectedItemStyleAndroid: {
        color: '#0076ff',
        fontWeight: '500',
      },
    });*/
  };

  render() {
    return (
      <View style={styles.container}>
        <Touchable
          feedback="opacity"
          native={false}
          onPress={this._onPressText}
        >
          <Text>Open up picker, selected letter:</Text>
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
