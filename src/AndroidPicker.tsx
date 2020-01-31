import * as React from 'react';
import { View, Animated, Text, StyleSheet, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import Touchable from '@appandflow/touchable';
import pickerStore, { ANIMATION_DURATION, Item } from './PickerStore';

const ANDROID_SECONDARY_VARIANT = '#018786';

interface P {
  onPressDone: (item: Item | Date) => void;
  onChange: any;
  getRef: (androidPicker: AndroidPicker) => void;
  date: Date;
  onCancel: () => void;
}

export default class AndroidPicker extends React.Component<P> {
  state = {
    isOpen: true,
    opacity: new Animated.Value(0),
    windowOpacity: new Animated.Value(0),
    date: new Date(),
  };

  componentDidMount() {
    this.props.getRef(this);
    this.setState({ date: this.props.date });
  }

  _animateOpen = () => {
    Animated.timing(this.state.opacity, {
      toValue: 0.4,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.state.windowOpacity, {
      toValue: 1,
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
    Animated.timing(this.state.windowOpacity, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { pickerOptions } = pickerStore;

    const doneButtonText = pickerOptions.doneButtonText || 'Ok';
    const cancelButtonText = pickerOptions.cancelButtonText || 'Cancel';

    if (!this.state.isOpen) {
      return null;
    }

    return pickerOptions.pickerType === 'normal' ? (
      <View
        style={{
          flex: 1,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: '10%',
          ...StyleSheet.absoluteFillObject,
        }}
      >
        <Touchable
          feedback="none"
          native={false}
          style={{
            flex: 1,
            position: 'absolute',
            ...StyleSheet.absoluteFillObject,
          }}
          onPress={pickerOptions.onTapOut || this.props.onCancel}
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
          style={{
            backgroundColor: 'rgb(250,250,250)',
            maxHeight: '70%',
            padding: 20,
            minHeight: '25%',
            width: '100%',
            borderRadius: 3,
            opacity: this.state.windowOpacity,
          }}
        >
          <View style={{ flex: 1 }} />
          {/* <FlatList data={pickerOptions.items || []} style={{ flex: 1 }} /> */}
          <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
            <AndroidButtonText
              text={cancelButtonText}
              onPress={pickerOptions.onTapOut || this.props.onCancel}
              style={{ marginRight: 30 }}
            />
            <AndroidButtonText
              text={doneButtonText}
              onPress={this.props.onChange}
            />
          </View>
        </Animated.View>
      </View>
    ) : (
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
  }
}

const AndroidButtonText = ({
  text,
  onPress,
  style,
}: {
  text: string;
  onPress: any;
  style?: any;
}) => (
  <Touchable
    feedback="opacity"
    native={false}
    onPress={onPress}
    hitslop={{ top: 10, left: 10, right: 10, bottom: 10 }}
  >
    <Text
      style={[
        {
          color: ANDROID_SECONDARY_VARIANT,
          fontSize: 17,
          fontWeight: '400',
        },
        style,
      ]}
    >
      {text}
    </Text>
  </Touchable>
);
