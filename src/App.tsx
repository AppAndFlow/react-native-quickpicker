import * as React from 'react';
// import { registerRootComponent } from 'expo';
import { StyleSheet, View, Text } from 'react-native';
import Touchable from '@appandflow/touchable';
import QuickPicker from './QuickPicker';

export default class App extends React.Component {
  state = {
    selectedDate: new Date(),
    item: {
      value: '1',
      label: 'salut1',
    },
  };

  _onPressText = () => {
    QuickPicker.open({
      onChange: selectedDate => this.setState({ selectedDate }),
      date: this.state.selectedDate,
      pickerType: 'time',
      mode: 'time',
      // disableTopRow: true,
      // doneButtonText: 'Termine',

      // item: this.state.item,

      onPressDone: item => console.warn(item),
      items: [
        {
          value: '1',
          label: 'salut1',
        },
        {
          value: '2',
          label: 'salut2',
        },
      ],
    });
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
          <Text>
            Open up picker, selected letter:{' '}
            {this.state.selectedDate.toLocaleTimeString()}
          </Text>
          <Text>Open up picker, selected letter: {this.state.item.label}</Text>
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
