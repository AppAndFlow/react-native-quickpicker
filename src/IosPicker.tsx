import * as React from 'react';
import { View, Animated, StyleSheet, Platform, Text } from 'react-native';
import Touchable from '@appandflow/touchable';
import pickerStore, { PickerOptions } from './PickerStore';

const HEIGHT = 250;
const DURATION = 250;
const BORDERHEIGHT = 50;
const iOS_BLUE = 'rgb(0,122,255)';
const ANDROID_PURPLE = '#6200EE';
const BACKGROUND_COLOR = '#F1F1F1';

export default class IosPicker extends React.Component {
  state = {
    isOpen: false,
    deltaY: new Animated.Value(0),
    opacity: new Animated.Value(0),
  };

  static open(options: PickerOptions) {
    pickerStore.open(options);
  }

  static close() {
    pickerStore.close();
  }

  componentDidMount() {
    pickerStore.pickerComponent = this;
  }

  _open = () => {
    this.setState({ isOpen: true }, () => {
      this._animateOpen();
    });
  };

  _close = () => {
    this._animateClose();
    setTimeout(() => this.setState({ isOpen: false }), DURATION);
  };

  _animateOpen = () => {
    Animated.timing(this.state.opacity, {
      toValue: 0.4,
      duration: DURATION,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.state.deltaY, {
      toValue: -HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  _animateClose = () => {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: DURATION,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.state.deltaY, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  _onPressDone = () => {
    const { pickerOptions } = pickerStore;
    if (pickerOptions.onPressDone && pickerOptions.value) {
      pickerOptions.onPressDone(pickerOptions.value);
    }
    QuickPicker.close();
  };

  render() {
    const { isOpen } = this.state;
    const { pickerOptions } = pickerStore;
    if (!isOpen) {
      return null;
    }

    const doneButtonText = pickerOptions.doneButtonText || 'Done';

    return (
      <View
        style={{
          flex: 1,
          position: 'absolute',
          ...StyleSheet.absoluteFillObject,
        }}
      >
        <Touchable
          feedback="none"
          native={false}
          style={{ flex: 1 }}
          onPress={pickerOptions.onTapOut || QuickPicker.close}
        >
          <Animated.View
            style={[
              {
                opacity: this.state.opacity,
                flex: 1,
                backgroundColor: 'black',
              },
            ]}
          />
        </Touchable>
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
              backgroundColor: BACKGROUND_COLOR,
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
                <Touchable feedback="opacity" onPress={this._onPressDone}>
                  <Text
                    style={[
                      {
                        fontWeight: '600',
                        fontSize: 20,
                        color:
                          Platform.OS === 'ios' ? iOS_BLUE : ANDROID_PURPLE,
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
      </View>
    );
  }
}
