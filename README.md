# react-native-quickpicker

[![npm (scoped)](https://img.shields.io/npm/v/quick-picker.svg)](https://www.npmjs.com/package/quick-picker) 

A picker built in JS for react-native/expo that works right out of the box.

## iOS Appearance

### `pickerType='normal'`
![Alt Text](https://github.com/Valiums/react-native-quickpicker/blob/master/assets/exemple.gif)
### `pickerType='date'`
![Alt Text](https://cdn.discordapp.com/attachments/172179439663316992/474246317749567498/android5.gif)

## Android Appearance

### `pickerType='normal'`
![Alt Text](https://cdn.discordapp.com/attachments/172179439663316992/474246292210712576/android4.gif)
### `pickerType='date'`
![Alt Text](https://cdn.discordapp.com/attachments/172179439663316992/474246232500469761/android3.gif)
## Why use this library?

The picker is one of the most common input component in mobile applications, but unfortunately most of the solutions requires linking, meaning it won't be possible to use with Expo without ejecting. This one works perfectly in both Vanilla React Native and Expo.

## Installation

`npm i quick-picker --save`

or

`yarn add quick-picker`

## Usage Example

`At the root of your app (preferably but not imperatively), you want to have <QuickPicker />`

```js
import React, { Component } from 'react';
import { View } from 'react-native';
import QuickPicker from 'quick-picker';

class App extends Component {
  render() {
    const content = null;
    return (
      <View style={styles.fill}>
        <StatusBar />
        <SideMenu>
          <OtherFancyStuff />  
          {content}
        </SideMenu>
        <QuickPicker />
      </View>
    );
  }
}
```

`Now if you want to open the Picker (that could be anywhere in your app's navigation), you must call QuickPicker.open({...})`

```js

import Touchable from '@appandflow/touchable';
import QuickPicker from 'quick-picker';

export default class AnotherRandomComponent extends React.Component {
  state = {
    selectedLetter: null
  }

  _onPressText = () => {
    const { selectedLetter } = this.state;
    QuickPicker.open({ 
        items: ['a', 'b', 'c'], 
        selectedValue: 'b', // this could be this.state.selectedLetter as well.
        onValueChange: (selectedValueFromPicker) => this.setState({ selectedLetter: selectedValueFromPicker }),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Touchable feedback="opacity" native={false} onPress={this._onPressText}>
          <Text>Open up picker, selected letter: {this.state.selectedLetter}</Text>
        </Touchable>
      </View>
    );
  }
}
```

`Now when the user will touch the button (<Touchable>) the Picker will open with the defined params in QuickPicker.open({...})`

## API

`Static QuickPicker.open(config)`

Opens the picker.

```js
    config = {
        items: ?Array<string>,
        selectedValue: ?string | ?Date, // if pickerType is set to 'date', give a Date
        onValueChange: ?Function,
        backgroundColor: ?string,
        topRow: ?Component, // e.g <View> <Text> this will be displayed in the top section of the picker </Text>  </View>
        onPressDone: ?Function, // When user press done button, if you haven't redefined the topRow and kept the default one.
        onTapOut: ?Function, // will be triggered when user tap off the picker
        textStyle: ?Object, // change item text styling, only on IOS
        doneButtonTextStyle: ?Object, // change the styling of the done button's 
        // text, if you haven't redefined the topRow and kept the default one.
        useNativeDriver: boolean, // use Native Driver for animated or not. Default is false.

        // the following props can only be set if pickerType value is 'date'.
        // it use the same API as DatePickerIOS or DatePickerAndroid depending on the os.
        pickerType: ?enum('normal', 'date'), // default value is 'normal'
        mode: ?enum('date', 'time', 'datetime', 'calendar', 'spinner', 'default'),
        minimumDate: ?Date,
        maximumDate: ?Date,   
    }
```

`Static QuickPicker.close()`

Closes the picker.
