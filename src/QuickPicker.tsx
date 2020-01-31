import * as React from 'react';
import { View, Animated, StyleSheet, Platform, Text } from 'react-native';
import Touchable from '@appandflow/touchable';
import pickerStore, {
  PickerOptions,
  Item,
  ANIMATION_DURATION,
} from './PickerStore';
import IosPicker from './IosPicker';
import AndroidPicker from './AndroidPicker';

export default class QuickPicker extends React.Component {
  state = {
    isOpen: false,
    opacity: new Animated.Value(0),
  };
  _iosPicker: IosPicker | null = null;
  _androidPicker: AndroidPicker | null = null;

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
      this._iosPicker?._animateOpen();
      this._androidPicker?._animateOpen();
    });
  };

  _close = () => {
    this._animateClose();
    this._iosPicker?._animateClose();
    this._androidPicker?._animateClose();
    setTimeout(() => this.setState({ isOpen: false }), ANIMATION_DURATION);
  };

  _animateOpen = () => {
    if (
      Platform.OS === 'android' &&
      pickerStore.pickerOptions.pickerType !== 'normal'
    ) {
      return;
    }
    Animated.timing(this.state.opacity, {
      toValue: 0.4,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  _animateClose = () => {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  _onPressDone = () => {
    const { pickerOptions } = pickerStore;
    if (pickerOptions.onPressDone && pickerOptions.item) {
      pickerOptions.onPressDone(pickerOptions.item);
    } else if (pickerOptions.onPressDone && pickerOptions.date) {
      pickerOptions.onPressDone(pickerOptions.date);
    }
    QuickPicker.close();
  };

  _onChange = (item: Item & Date) => {
    const { pickerOptions } = pickerStore;
    if (pickerOptions.onChange && item) {
      pickerOptions.onChange(item);

      if (item.label) {
        pickerOptions.item = item;
      } else {
        pickerOptions.date = item;
      }
    }

    if (Platform.OS === 'android') {
      QuickPicker.close();
    }
  };

  render() {
    const { isOpen } = this.state;
    const { pickerOptions } = pickerStore;

    if (!isOpen) {
      return null;
    }

    if (Platform.OS === 'android' || true) {
      return (
        <AndroidPicker
          date={pickerOptions.date || new Date()}
          onPressDone={this._onPressDone}
          getRef={_androidPicker => (this._androidPicker = _androidPicker)}
          onChange={this._onChange}
          onCancel={QuickPicker.close}
          item={pickerOptions.item!}
        />
      );
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
        <IosPicker
          onPressDone={this._onPressDone}
          getRef={iosPicker => (this._iosPicker = iosPicker)}
          onChange={this._onChange}
        />
      </View>
    );
  }
}
