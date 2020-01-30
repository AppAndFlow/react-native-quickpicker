import * as React from 'react';
import { View, Animated, Platform, Text, Picker } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Touchable from '@appandflow/touchable';
import pickerStore, { Item, ANIMATION_DURATION } from './PickerStore';

const HEIGHT = 250;

const BORDERHEIGHT = 50;
const iOS_BLUE = 'rgb(0,122,255)';
// const ANDROID_PURPLE = '#6200EE';
const TOP_BACKGROUND_COLOR = '#F1F1F1';
const BACKGROUND_COLOR = '#E2E2E2';

interface P {
  onPressDone: () => void;
  onChange: (item: Item) => void;
  getRef: (iosPicker: IosPicker) => void;
}

export default class IosPicker extends React.Component<P> {
  state = {
    isOpen: false,
    deltaY: new Animated.Value(0),
  };

  componentDidMount() {
    this.props.getRef(this);
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

  _renderPickerBasedOnType = () => {
    const { pickerOptions } = pickerStore;

    return (
      <View
        style={[
          { backgroundColor: BACKGROUND_COLOR, height: HEIGHT - BORDERHEIGHT },
          pickerOptions.disableTopRow ? { height: HEIGHT } : {},
        ]}
      >
        {pickerOptions.pickerType === 'normal' ? (
          <Picker
            selectedValue={pickerOptions.item?.value}
            onValueChange={(_, itemIndex) =>
              this.props.onChange(pickerStore.pickerOptions.items[itemIndex])
            }
            // @ts-ignore
            pickerStyleType={pickerOptions.pickerStyleType}
            itemStyle={pickerOptions.itemStyle}
          >
            {pickerOptions.items.map((item, index) => (
              <Picker.Item
                key={`${item.value}-${index}-pickeritem`}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        ) : null /*(
          <DateTimePicker
            date={selectedValue}
            mode={mode}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            onDateChange={date => this.props.onValueChange(date)}
            locale={locale}
            timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
            minuteInterval={minuteInterval}
          />
        ) */}
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
