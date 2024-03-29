import * as React from 'react';
import { View, Animated, Platform, Text, Picker } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Touchable from '@appandflow/touchable';
import pickerStore, { ANIMATION_DURATION } from './PickerStore';

const HEIGHT = 250;

const BORDERHEIGHT = 50;
const iOS_BLUE = 'rgb(0,122,255)';
// const ANDROID_PURPLE = '#6200EE';
const TOP_BACKGROUND_COLOR = '#F1F1F1';
const BACKGROUND_COLOR = '#E2E2E2';

interface P {
  onPressDone: () => void;
  onChange: any;
  getRef: (iosPicker: IosPicker) => void;
}

export default class IosPicker extends React.Component<P> {
  state = {
    isOpen: false,
    deltaY: new Animated.Value(0),
    value: pickerStore.pickerOptions.item
      ? pickerStore.pickerOptions.item.value
      : pickerStore.pickerOptions.items
      ? pickerStore.pickerOptions.items[0]
      : undefined,
  };

  componentDidMount() {
    this.props.getRef(this);
  }

  _animateOpen = () => {
    if (Platform.OS !== 'ios') {
      return null;
    }
    Animated.timing(this.state.deltaY, {
      toValue: -HEIGHT,
      duration: ANIMATION_DURATION,
      useNativeDriver: pickerStore.pickerOptions.useNativeDriver || false,
    }).start();
  };

  _animateClose = () => {
    if (Platform.OS !== 'ios') {
      return null;
    }
    Animated.timing(this.state.deltaY, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: pickerStore.pickerOptions.useNativeDriver || false,
    }).start();
  };

  _renderPickerBasedOnType = () => {
    const { pickerOptions } = pickerStore;

    const items = pickerOptions.items ? pickerOptions.items : [];

    return (
      <View
        style={[
          { backgroundColor: BACKGROUND_COLOR, height: HEIGHT - BORDERHEIGHT },
          pickerOptions.disableTopRow ? { height: HEIGHT } : {},
        ]}
      >
        {pickerOptions.pickerType === 'normal' ? (
          <Picker
            selectedValue={
              pickerOptions.item ? pickerOptions.item?.value : this.state.value
            }
            onValueChange={(_, itemIndex) => {
              // @ts-ignore
              this.props.onChange(items[itemIndex]);

              if (!pickerOptions.item) {
                this.setState({ value: items[itemIndex].value });
              }
              this.forceUpdate();
            }}
            // @ts-ignore
            pickerStyleType={pickerOptions.pickerStyleType}
            itemStyle={pickerOptions.itemStyle}
          >
            {items.map((item, index) => (
              // @ts-ignore
              <Picker.Item
                key={`${item.value}-${index}-pickeritem`}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        ) : (
          <DateTimePicker
            value={pickerOptions.date || new Date()}
            // @ts-ignore
            mode={pickerOptions.mode || 'time'}
            onChange={(_, date) => this.props.onChange(date)}
            maximumDate={pickerOptions.maximumDate}
            minimumDate={pickerOptions.minimumDate}
            timeZoneOffsetInMinutes={pickerOptions.timeZoneOffsetInMinutes}
            locale={pickerOptions.locale}
            // @ts-ignore
            is24Hour={pickerOptions.is24Hour}
            minuteInterval={pickerOptions.minuteInterval}
            themeVariant="light"
            display={Platform.OS === 'ios' ? 'spinner' : undefined}
          />
        )}
      </View>
    );
  };

  render() {
    const { pickerOptions } = pickerStore;
    if (Platform.OS !== 'ios') {
      return null;
    }

    const doneButtonText = pickerOptions.doneButtonText || 'Done';

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
