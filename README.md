# react-native-quickpicker

[![npm (scoped)](https://img.shields.io/npm/v/quick-picker.svg)](https://www.npmjs.com/package/quick-picker) 

A Quick and Dirty Picker for react-native that should work right Out of the box.

## Why use this library?

Cause you don't want to waste your precious time on implementing (once again) a picker using the 
react-native picker api for your 1 million $ app. (can't blame ya!)

## Installation

`npm i quick-picker --save`

or (if you feel more edgy today)

`yarn add quick-picker`

## Usage Example

`At the root of your app (preferably but not imperatively), you wanna had <QuickPicker />`

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

`You get the point. Now If you wanna open the Picker (that could be at any place in your app)`

```js

import QuickPicker from 'quick-picker';

export default class App extends React.Component {
  state = {
    selectedLetter: null
  }

  _onPressText = () => {
    const { selectedLetter } = this.state;
    QuickPicker.open({ 
        items: ['a', 'b', 'c'], 
        selectedValue: 'b',
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
