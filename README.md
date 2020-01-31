# react-native-quickpicker

[![npm (scoped)](https://img.shields.io/npm/v/quick-picker.svg)](https://www.npmjs.com/package/quick-picker)

A picker built in JS for react-native/expo that works right out of the box.

## iOS Appearance

### `pickerType="normal"`

![Alt Text](https://github.com/Valiums/react-native-quickpicker/blob/master/assets/exemple.gif)

### `pickerType="date" && mode="datetime"`

![Alt Text](https://cdn.discordapp.com/attachments/172179439663316992/474246317749567498/android5.gif)

## Android Appearance

### `pickerType="normal"`

![Alt Text](https://cdn.discordapp.com/attachments/172179439663316992/474246292210712576/android4.gif)

### `pickerType="date" && mode="datetime"`

![Alt Text](https://cdn.discordapp.com/attachments/172179439663316992/474246232500469761/android3.gif)

## Why use this library?

The picker is one of the most common input component in mobile applications, but unfortunately most of the solutions require linking, meaning it won't be possible to use with Expo without ejecting. This one works perfectly in both Vanilla React Native and Expo.

## Installation

`npm i quick-picker --save`

or

`yarn add quick-picker`

## Usage Example

`At the root of your app (preferably but not imperatively), you want to have <QuickPicker />`

```js
import React, { Component } from "react";
import { View } from "react-native";
import QuickPicker from "quick-picker";

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
import Touchable from "@appandflow/touchable";
import QuickPicker from "quick-picker";

export default class AnotherRandomComponent extends React.Component {
  state = {
    selectedLetter: null,
  };

  _onPressText = () => {
    const { selectedLetter } = this.state;
    QuickPicker.open({
      items: ["a", "b", "c"],
      selectedValue: "b", // this could be this.state.selectedLetter as well.
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
        doneButtonText: ?string, // change the "done" button string. Default is "done".
        doneButtonTextStyle: ?Object, // change the styling of the done button's
        androidModalStyle: ?Object, // change the styling of the default picker's modal on Android
        itemStyleAndroid: ?Object, // change the styling of the default picker's items on Android. Applied also to selected item.
        selectedItemStyleAndroid: ?Object, // change the styling of the default picker's selected item on Android.
        // text, if you haven't redefined the topRow and kept the default one.
        useNativeDriver: boolean, // use Native Driver for animated or not. Default is false.

        // the following props can only be set if pickerType value is 'date'.
        // it use the same API as DatePickerIOS or DatePickerAndroid depending on the os.
        pickerType: ?enum('normal', 'date'), // default value is 'normal'
        mode: ?enum('date', 'time', 'datetime'), // only if pickerType === "date"
        minimumDate: ?Date,
        maximumDate: ?Date,

        disableTopRow: ?boolean, // only on iOS, default = false. Will completely hide the top bar where you would normally find the "done" button.

        locale: ?string, // see https://facebook.github.io/react-native/docs/datepickerios#locale
        timeZoneOffsetInMinutes: ?Number, // see https://facebook.github.io/react-native/docs/datepickerios#timeZoneOffsetInMinutes
        minuteInterval: ?Number, // see https://facebook.github.io/react-native/docs/datepickerios#minuteInterval

    }
```

`Static QuickPicker.close()`

Closes the picker.

#### PickerOptions

| **field** | **type** | **defaultValue** | **Platform** | **description** |
| --- | --- | --- | --- | --- |
| item | Item | undefined | Both | Picker's selected item |
| items | Item[] | [] | Both | Picker's items |
| onChange | (Item \| Date) => void | undefined | Both | Callback function when an item is selected |
| onPressDone | (Item \| Date) => void | undefined | Both | Callback function when Done/Ok button is pressed |
| onTapOut | () => void | undefined | Both | Callback function when Cancel button is pressed or when user taps Out |
| disableTopRow | boolean | false | iOS | Disable the picker top bar |
| topRow | ReactNode | undefined | iOS | If you want to create your own custom top bar |
| doneButtonText | string | "Done" (iOS) "Ok" (Android) | Both | Done button text |
| cancelButtonText | string | "Cancel" | Android | Cancel button text |
| doneButtonTextStyle | TextStyle | undefined | Both | Done (and Cancel on Android) button text style |
| androidModalStyle | ViewStyle | undefined | Android | Android's modal view style |
| androidItemStyle | ViewStyle | undefined | Android | Android's modal items style |
| androidItemTextStyle | TextStyle | undefined | Android | Android's modal items text style |
| androidSelectedItemStyle | TextStyle | undefined | Android | Android's modal selected item text style |
| pickerType           | "normal" \| "time"        | "normal"        | Both           | sets the picker to his normal mode or to time mode|
| mode           | "date" \| "time" \| "datetime" \| "countdown"         | undefined        | Both           | mode if pickerType is set to "time"|
| display           | "default" \| "spinner" \| "calendar" \| "clock"         | undefined        | Android          |Defines the visual display of the picker for Android |
| date | Date | new Date() | both | Current selected date |
| maximumDate | Date |  undefined | both | Maximum date |
| minimumDate | Date |  undefined | both | Minimum date |
| timeZoneOffsetInMinutes | number |  undefined | iOS | Allows changing of the timeZone of the date picker. By default it uses the device's time zone.|
| locale | string |  undefined | iOS | Allows changing of the locale of the component. By default it uses the device's locale. |
| is24Hour | boolean |  undefined | Android | Allows changing of the time picker to a 24 hour format. |
| minuteInterval | 1 \| 2 \| 6 \| 5 \| 4 \| 3 \| 10 \| 12 \| 15 \| 20 \| 30 |  undefined | iOS | The interval at which minutes can be selected. |
| useNativeDriver | boolean |  true | both | Use native driver |

#### Item

| **field** | **type** | **description** |
| --- | --- | --- |
| value | string or number | item's value |
| label | string | item's label |

