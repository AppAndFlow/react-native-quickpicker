# react-native-quickpicker

[![npm (scoped)](https://img.shields.io/npm/v/quick-picker.svg)](https://www.npmjs.com/package/quick-picker)

A picker built in JS for react-native/expo that works right out of the box.

## iOS Appearance

### `pickerType="normal"`

![Alt Text](https://github.com/Valiums/react-native-quickpicker/blob/master/assets/exemple.gif)

### `pickerType="time" && mode="datetime"`

![Alt Text](https://cdn.discordapp.com/attachments/172179439663316992/474246317749567498/android5.gif)

## Android Appearance

### `pickerType="normal"`

![Alt Text](https://cdn.discordapp.com/attachments/172179439663316992/474246292210712576/android4.gif)

### `pickerType="time" && mode="datetime"`

![Alt Text](https://cdn.discordapp.com/attachments/172179439663316992/474246232500469761/android3.gif)

## About Quickpicker

This picker is offering an out of the box solution. It allows you to handle iOS and Android using the same API. It supports regular picker and date/time picker. It combines https://facebook.github.io/react-native/docs/picker and https://github.com/react-native-community/react-native-datetimepicker#react-native-datetimepicker into a single API.

## Installation

`npm i quick-picker`

if you are using RN < 60 make sure to use 1.x.x

## Usage Example

`At the top level of your app (preferably but not imperatively), you want to have <QuickPicker />`

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
    selectedLetter: null,
  };

  _onPressText = () => {
    const { selectedLetter } = this.state;
    QuickPicker.open({
      items: ['a', 'b', 'c'],
      selectedValue: 'b', // this could be this.state.selectedLetter as well.
      onValueChange: selectedValueFromPicker =>
        this.setState({ selectedLetter: selectedValueFromPicker }),
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
            Open up picker, selected letter: {this.state.selectedLetter}
          </Text>
        </Touchable>
      </View>
    );
  }
}
```

`Now when the user will touch the button (<Touchable>) the Picker will open with the defined params in QuickPicker.open({...})`

## API

`Static QuickPicker.open(pickerOptions)`

Opens the picker.

`Static QuickPicker.close()`

Closes the picker.

#### PickerOptions

| **field**                | **type**                                                 | **defaultValue**            | **Platform** | **description**                                                                                |
| ------------------------ | -------------------------------------------------------- | --------------------------- | ------------ | ---------------------------------------------------------------------------------------------- |
| item                     | Item                                                     | undefined                   | Both         | Picker's selected item                                                                         |
| items                    | Item[]                                                   | []                          | Both         | Picker's items                                                                                 |
| onChange                 | (Item \| Date) => void                                   | undefined                   | Both         | Callback function when an item is selected                                                     |
| onPressDone              | (Item \| Date) => void                                   | undefined                   | Both         | Callback function when Done/Ok button is pressed                                               |
| onTapOut                 | () => void                                               | undefined                   | Both         | Callback function when Cancel button is pressed or when user taps Out                          |
| disableTopRow            | boolean                                                  | false                       | iOS          | Disable the picker top bar                                                                     |
| topRow                   | ReactNode                                                | undefined                   | iOS          | If you want to create your own custom top bar                                                  |
| doneButtonText           | string                                                   | "Done" (iOS) "Ok" (Android) | Both         | Done button text                                                                               |
| cancelButtonText         | string                                                   | "Cancel"                    | Android      | Cancel button text                                                                             |
| doneButtonTextStyle      | TextStyle                                                | undefined                   | Both         | Done (and Cancel on Android) button text style                                                 |
| androidModalStyle        | ViewStyle                                                | undefined                   | Android      | Android's modal view style                                                                     |
| androidItemStyle         | ViewStyle                                                | undefined                   | Android      | Android's modal items style                                                                    |
| androidItemTextStyle     | TextStyle                                                | undefined                   | Android      | Android's modal items text style                                                               |
| androidSelectedItemStyle | TextStyle                                                | undefined                   | Android      | Android's modal selected item text style                                                       |
| pickerType               | "normal" \| "time"                                       | "normal"                    | Both         | sets the picker to his normal mode or to time mode                                             |
| mode                     | "date" \| "time" \| "datetime" \| "countdown"            | undefined                   | Both         | mode if pickerType is set to "time"                                                            |
| display                  | "default" \| "spinner" \| "calendar" \| "clock"          | undefined                   | Android      | Defines the visual display of the picker for Android                                           |
| date                     | Date                                                     | new Date()                  | both         | Current selected date                                                                          |
| maximumDate              | Date                                                     | undefined                   | both         | Maximum date                                                                                   |
| minimumDate              | Date                                                     | undefined                   | both         | Minimum date                                                                                   |
| timeZoneOffsetInMinutes  | number                                                   | undefined                   | iOS          | Allows changing of the timeZone of the date picker. By default it uses the device's time zone. |
| locale                   | string                                                   | undefined                   | iOS          | Allows changing of the locale of the component. By default it uses the device's locale.        |
| is24Hour                 | boolean                                                  | undefined                   | Android      | Allows changing of the time picker to a 24 hour format.                                        |
| minuteInterval           | 1 \| 2 \| 6 \| 5 \| 4 \| 3 \| 10 \| 12 \| 15 \| 20 \| 30 | undefined                   | iOS          | The interval at which minutes can be selected.                                                 |
| useNativeDriver          | boolean                                                  | true                        | both         | Use native driver                                                                              |

#### Item

| **field** | **type**         | **description** |
| --------- | ---------------- | --------------- |
| value     | string or number | item's value    |
| label     | string           | item's label    |
