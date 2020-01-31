import * as React from 'react';
import { View, Animated, Platform, Text, Picker } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import Touchable from '@appandflow/touchable';
import pickerStore, { ANIMATION_DURATION, Item } from './PickerStore';

const HEIGHT = 250;

const BORDERHEIGHT = 50;
const iOS_BLUE = 'rgb(0,122,255)';
// const ANDROID_PURPLE = '#6200EE';
const TOP_BACKGROUND_COLOR = '#F1F1F1';
const BACKGROUND_COLOR = '#E2E2E2';

interface P {
  onPressDone: (item: Item | Date) => void;
  onChange: any;
  getRef: (androidPicker: AndroidPicker) => void;
  date: Date;
}

export default class AndroidPicker extends React.Component<P> {
  state = {
    isOpen: true,
    deltaY: new Animated.Value(0),
    date: new Date(),
  };

  componentDidMount() {
    this.props.getRef(this);
    this.setState({ date: this.props.date });
  }

  _animateOpen = () => {
    Animated.timing(this.state.deltaY, {
      toValue: -HEIGHT,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  _animateClose = () => {
    Animated.timing(this.state.deltaY, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { pickerOptions } = pickerStore;

    const doneButtonText = pickerOptions.doneButtonText || 'Done';

    if (!this.state.isOpen) {
      return null;
    }

    return pickerOptions.pickerType === 'normal' ? null : (
      <DateTimePicker
        value={this.state.date}
        // @ts-ignore
        mode={pickerOptions.mode || 'time'}
        onChange={(_, date) => {
          this.setState({ isOpen: false }, () => this.props.onChange(date));
        }}
        maximumDate={pickerOptions.maximumDate}
        minimumDate={pickerOptions.minimumDate}
        timeZoneOffsetInMinutes={pickerOptions.timeZoneOffsetInMinutes}
        locale={pickerOptions.locale}
        // @ts-ignore
        is24Hour={pickerOptions.is24Hour}
        minuteInterval={pickerOptions.minuteInterval}
      />
    );

    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 0 - HEIGHT,
            right: 0,
            left: 0,
            height: HEIGHT,
            borderTopWidth: 1,
            borderColor: 'lightgray',
            transform: [
              {
                translateY: this.state.deltaY,
              },
            ],
          },
        ]}
      >
        <View
          style={{
            height: pickerOptions.disableTopRow ? 0 : BORDERHEIGHT,
            backgroundColor: TOP_BACKGROUND_COLOR,
          }}
        >
          {pickerOptions.topRow ? (
            pickerOptions.topRow
          ) : (
            <View
              style={[
                {
                  height: BORDERHEIGHT,
                  paddingHorizontal: 17,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                },
                pickerOptions.disableTopRow ? { height: 0 } : {},
              ]}
            >
              <Touchable feedback="opacity" onPress={this.props.onPressDone}>
                <Text
                  style={[
                    {
                      fontWeight: '600',
                      fontSize: 20,
                      color: iOS_BLUE,
                    },
                    pickerOptions.doneButtonTextStyle
                      ? { ...pickerOptions.doneButtonTextStyle }
                      : {},
                  ]}
                >
                  {doneButtonText}
                </Text>
              </Touchable>
            </View>
          )}
        </View>
        {this._renderPickerBasedOnType()}
      </Animated.View>
    );
  }
}
