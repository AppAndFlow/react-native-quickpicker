import * as React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import Touchable from '@appandflow/touchable';

const HEIGHT = 250;
const DURATION = 250;

interface PickerStore {
  isOpen: boolean;
  pickerComponent: QuickPicker | null;
  open: any;
  close: any;
  pickerOptions: any;
}

const pickerStore: PickerStore = {
  isOpen: false,
  pickerComponent: null,
  pickerOptions: {},
  open: (pickerOptions: any) => {
    if (pickerStore.pickerComponent) {
      pickerStore.pickerComponent._open();
      pickerStore.pickerOptions = pickerOptions;
    }
  },
  close: () => {
    if (pickerStore.pickerComponent) {
      pickerStore.pickerComponent._close();
    }
  },
};

export default class QuickPicker extends React.Component {
  state = {
    isOpen: false,
    deltaY: new Animated.Value(0),
    opacity: new Animated.Value(0),
  };

  static open() {
    pickerStore.open({});
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
  };

  _animateClose = () => {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: DURATION,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { isOpen } = this.state;
    const { pickerOptions } = pickerStore;
    if (!isOpen) {
      return null;
    }

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
          {/* <View
            style={{
              height: disableTopRow ? 0 : BORDERHEIGHT,
              backgroundColor: '#F1F1F1',
            }}
          >
            {topRow ? (
              topRow
            ) : (
              <View
                style={[
                  styles.borderContainer,
                  disableTopRow ? { height: 0 } : {},
                ]}
              >
                <Touchable feedback="opacity" onPress={onPressDone}>
                  <Text style={[styles.doneButton, doneButtonTextStyle]}>
                    {doneButtonText}
                  </Text>
                </Touchable>
              </View>
            )}
          </View>
          {this._renderPickerBasedOnType()} */}
        </Animated.View>
      </View>
    );
  }
}
