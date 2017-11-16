// @flow

import React from 'react';
import { StyleSheet, Animated, View, Text, Picker, Platform, DatePickerIOS, FlatList, Dimensions } from 'react-native';
import Touchable from '@appandflow/touchable';

const DEFAULT_BACKGROUNDCOLOR = '#E2E2E2';

const subscribers = [];
let uniqueId = 0;

let isOpen = false;
let onValueChange = () => null;
let onTapOut = null;
let onPressDone = null;
let items = [];
let selectedValue = null;
let backgroundColor = DEFAULT_BACKGROUNDCOLOR;
let topRow = null;
let textStyle = null;
let doneButtonTextStyle = null;
let useNativeDriver = false;
let pickerType = 'normal';
let mode = Platform.OS === 'ios' ? 'date' : 'default';
let date = null;
let minimumDate = null;
let maximumDate = null;

type StateType = {
  isOpen: boolean,
  onValueChange: Function,
  onTapOut: ?Function,
  onPressDone: ?Function,
  items: Array<string>,
  selectedValue: ?string | ?Date,
  backgroundColor: string,
  topRow: any,
  textStyle: ?Object,
  doneButtonTextStyle: ?Object,
  useNativeDriver: boolean,
  pickerType: 'normal' | 'date',
  mode: 'date' | 'time' |'datetime' | 'calendar' | 'spinner' | 'default',
  minimumDate: ?Date,
  maximumDate: ?Date,
};

const pickerStore = {
  closePicker: () => {
    isOpen = false;
    onValueChange = () => null;
    onTapOut = null;
    onPressDone = null;
    // textStyle = null;
    // doneButtonTextStyle = null;
    // backgroundColor = DEFAULT_BACKGROUNDCOLOR;
    items = [];
    selectedValue = null;
    // useNativeDriver = false;
    pickerType = 'normal';
    mode = Platform.OS === 'ios' ? 'date' : 'default';
    minimumDate = null;
    maximumDate = null;
    pickerStore.updateSubscriber();
  },
  openPicker: (
    newitems: ?Array<string>,
    newselectedValue: ?string | ?Date,
    newonValueChange: ?Function,
    newbackgroundColor: ?string,
    newtopRow: any,
    newonPressDone: ?Function,
    newonTapOut: ?Function,
    newtextStyle: ?Object,
    newdoneButtonTextStyle: ?Object,
    newuseNativeDriver: boolean,
    newpickerType: ?('normal' | 'date'),
    newmode: ?('date' | 'time' |'datetime' | 'calendar' | 'spinner' | 'default'),
    newminimumDate: ?Date,
    newmaximumDate: ?Date,
  ) => {
    items = newitems;
    selectedValue = newselectedValue;
    onValueChange = (newValue: ?string) => {
      pickerStore.updateSelectedValue(newValue);
      if (newonValueChange) {
         newonValueChange(newValue);
      }
    };

    if (newonPressDone) {
        onPressDone = () => {
            newonPressDone(selectedValue);
        }
    }

    if (newonTapOut) {
        onTapOut = () => {
            newonTapOut(selectedValue);
        }
    }
    if (newbackgroundColor) {
       backgroundColor = newbackgroundColor
    }
    if (newtopRow) {
       topRow = newtopRow;
    }
    if (newtextStyle) {
        textStyle = newtextStyle;
    }
    if (newdoneButtonTextStyle) {
        doneButtonTextStyle = newdoneButtonTextStyle;
    }
    if (newuseNativeDriver) {
      useNativeDriver = newuseNativeDriver;
    }
    if (newpickerType) {
      pickerType = newpickerType;
    }
    if (newmode) {
      mode = newmode;
    }
    if (newminimumDate) {
      minimumDate = newminimumDate;
    }
    if (newmaximumDate) {
      maximumDate = newmaximumDate;
    }

    isOpen = true;
    pickerStore.updateSubscriber();
  },
  updateSelectedValue: (newselectedValue: ?string) => {
    selectedValue = newselectedValue;
    pickerStore.updateSubscriber();
  },
  updateSubscriber: () => {
    const state: StateType = {
      isOpen,
      items,
      selectedValue,
      onValueChange,
      backgroundColor,
      topRow,
      onPressDone,
      onTapOut,
      textStyle,
      doneButtonTextStyle,
      useNativeDriver,
      pickerType,
      mode,
      minimumDate,
      maximumDate,
    };
    subscribers.forEach(sub => sub.action(state));
  },
  addSubscription: (fonc: Function) => {
    uniqueId += 1;
    subscribers.push({ id: uniqueId, action: fonc });
    return uniqueId;
  },
  removeSubscription: (id: any) => {
    const index = subscribers.findIndex(e => e.id === id);
    subscribers.splice(index, 1);
  },
  isOpen: () => isOpen,
};

type GlobalPickerParams = {
    items: ?Array<string>,
    selectedValue: ?string,
    onValueChange: ?Function,
    backgroundColor: ?string,
    topRow: any,
    textStyle: ?Object,
    doneButtonTextStyle: ?Object,
    useNativeDriver?: boolean,
    pickerType: 'normal' | 'date',
    mode: 'date' | 'time' |'datetime' | 'calendar' | 'spinner' | 'default',
    minimumDate: ?Date,
    maximumDate: ?Date,
}


export default class GlobalPicker extends React.Component {

  static open(params: GlobalPickerParams) {
    const items = (params && params.items);
    const selectedValue = (params && params.selectedValue);
    const onValueChange = (params && params.onValueChange);
    const backgroundColor = (params && params.backgroundColor);
    const topRow = (params && params.topRow);
    const onTapOut = (params && params.onTapOut);
    const onPressDone = (params && params.onPressDone);
    const textStyle = (params && params.textStyle);
    const doneButtonTextStyle = (params && params.doneButtonTextStyle);
    const useNativeDriver = (params && params.useNativeDriver);

    const pickerType = (params && params.pickerType);
    const mode = (params && params.mode);
    const minimumDate = (params && params.minimumDate);
    const maximumDate = (params && params.maximumDate);

    pickerStore.openPicker(items,
      selectedValue, onValueChange, backgroundColor,
      topRow, onPressDone, onTapOut, textStyle,
      doneButtonTextStyle, useNativeDriver,
      pickerType, mode, minimumDate, maximumDate
    );
  }

  static close = () => {
    pickerStore.closePicker();
  }

  props: Props;
  state = {
    isOpen: false,
    items: [],
    onValueChange: () => null,
    onPressDone: null,
    onTapOut: null,
    selectedValue: null,
    backgroundColor: DEFAULT_BACKGROUNDCOLOR,
    topRow: null,
    textStyle: null,
    doneButtonTextStyle: null,
    useNativeDriver: null,
    pickerType: 'normal',
    mode: Platform.OS === 'ios' ? 'date' : 'default',
    minimumDate: null,
    maximumDate: null,
  };
  _pickerStoreId = null;

  componentDidMount() {
    this._pickerStoreId = pickerStore.addSubscription(state =>
      this.setState({
        items: state.items,
        onValueChange: state.onValueChange,
        isOpen: state.isOpen,
        selectedValue: state.selectedValue,
        backgroundColor: state.backgroundColor,
        topRow: state.topRow,
        onTapOut: state.onTapOut,
        onPressDone: state.onPressDone,
        textStyle: state.textStyle,
        doneButtonTextStyle: state.doneButtonTextStyle,
        useNativeDriver: state.useNativeDriver,
        pickerType: state.pickerType,
        mode: state.mode,
        minimumDate: state.minimumDate,
        maximumDate: state.maximumDate,
      }),
    );
  }

  componentWillUnmount() {
    pickerStore.removeSubscription(this._pickerStoreId);
  }

  render() {
    const { isOpen, selectedValue, onValueChange, items,
      backgroundColor, topRow, onPressDone, onTapOut,
      textStyle, doneButtonTextStyle, useNativeDriver,
      pickerType, mode, minimumDate, maximumDate,
    } = this.state;
    return (
        <Pick
            isOpen={isOpen}
            onPressDone={onPressDone || GlobalPicker.close}
            onTapOut={onTapOut || GlobalPicker.close}
            selectedValue={selectedValue || ((pickerType === 'normal' || pickerType === 'multi') ? null : new Date())}
            onValueChange={onValueChange || null}
            items={items || []}
            backgroundColor={backgroundColor}
            topRow={topRow}
            textStyle={textStyle}
            doneButtonTextStyle={doneButtonTextStyle}
            useNativeDriver={useNativeDriver || false}
            pickerType={pickerType || 'normal'}
            mode={mode}
            minimumDate={minimumDate || null}
            maximumDate={maximumDate || null}
        />
    );
  }
}

const HEIGHT = 250;

type PickProps = {
  isOpen: boolean,
  onPressDone: Function,
  onTapOut: Function,
  selectedValue: any,
  onValueChange: Function,
  items: Array<string>,
  backgroundColor: ?string,
  topRow: any,
  textStyle: ?Object,
  doneButtonTextStyle: ?Object,
  useNativeDriver: boolean,
  pickerType: string,
  mode: string,
  minimumDate: ?Date,
  maximumDate: ?Date,
};

class Pick extends React.Component {
  state = {
    deltaY: new Animated.Value(0),
    opacity: new Animated.Value(0),
    showMask: false,
    selectedValues: [],
  };
  props: PickProps;
  _maskTimeout = null;

  _checkPickerType = () => {
    if (this.props.pickerType === 'multi') {
      const selectedValues = Array.isArray(this.props.selectedValue) ? this.props.selectedValue : [this.props.selectedValue]

      console.warn('hehe', selectedValues)

      this.setState({ selectedValues })
    }
  }

  componentWillUnmount() {
      clearTimeout(this._maskTimeout);
  }

  _Open = () => {
    Animated.timing(this.state.deltaY, {
      toValue: -HEIGHT,
      duration: 250,
      useNativeDriver: this.props.useNativeDriver,
    }).start();
  };

  _Close = () => {
    Animated.timing(this.state.deltaY, {
      toValue: 0,
      duration: 250,
      useNativeDriver: this.props.useNativeDriver,
    }).start();
  };

  _fadeIn = () => {
    Animated.timing(this.state.opacity, {
      toValue: 0.4,
      duration: 250,
      useNativeDriver: this.props.useNativeDriver,
    }).start();
  };

  _fadeOut = () => {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 250,
      useNativeDriver: this.props.useNativeDriver,
    }).start();
    this._maskTimeout = setTimeout(() => this.setState({ showMask: false }), 250);
  };

  componentWillReceiveProps(newProps: Props) {
    if (this.props.isOpen !== newProps.isOpen) {
      if (newProps.isOpen) {
        this.setState({ showMask: true }, () => {
          this._checkPickerType()
          this._Open();
          this._fadeIn();
        });
      } else {
        this._fadeOut();
        this._Close();
      }
    }
  }

  _keyExtractor = (item) => item;


  _renderItem = ({item}) => {
    const { selectedValues } = this.state;

    const isSelected = selectedValues.find(a => a === item);

    return(
      <Touchable feedback="none" style={styles.flatlistButton} onPress={() => this._multiPickerOnValueChange(item)}>
        <Text style={[styles.flatlistButtonText, {width: 40, marginLeft: -40} , isSelected && { color: '#0076FF' }]}>
          {isSelected && "✓ "}
        </Text>
        <Text style={[styles.flatlistButtonText, isSelected && { color: '#0076FF' }]}>
          {item}
        </Text>
      </Touchable>
    );
  }

  _multiPickerOnValueChange = (selectedValueFromPicker) => {
    const itemIndex = this.state.selectedValues.findIndex(a => a === selectedValueFromPicker);
    const newselectedValues = this.state.selectedValues.slice();
    if (itemIndex !== -1) {
      newselectedValues.splice(itemIndex, 1);
      this.setState({ selectedValues: newselectedValues });
    } else {
      newselectedValues.push(selectedValueFromPicker);
      this.setState({ selectedValues: newselectedValues });
    }

    this.props.onValueChange(newselectedValues)

  }

  _renderPickerBasedOnType = () => {
    const { backgroundColor, topRow, onTapOut, onPressDone, textStyle,
      doneButtonTextStyle, pickerType, mode,
      minimumDate, maximumDate } = this.props;

    if (pickerType === 'multi') {
      return (
        <View style={[styles.bottomContainerFlatList, { backgroundColor }]}>
          <FlatList
            style={{ flex: 1 }}
            data={items}
            extraData={this.props}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )
    }






    return (
      <View style={[styles.bottomContainer, { backgroundColor }]}>
        {
          pickerType === 'normal' ?
            <Picker
            selectedValue={this.props.selectedValue}
            onValueChange={itemValue => this.props.onValueChange(itemValue)}
            itemStyle={textStyle}
          >
            {this.props.items.map(item =>
              <Picker.Item key={item} label={item} value={item} />,
            )}
          </Picker> : (Platform.OS === 'ios' &&
            <DatePickerIOS
              date={selectedValue}
              mode={mode}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              onDateChange={date => this.props.onValueChange(date)}
            />
          )
        }
      </View>
    )


  }

  render() {
    const { backgroundColor, topRow, onTapOut, onPressDone, textStyle, doneButtonTextStyle, pickerType, mode,
      minimumDate, maximumDate } = this.props;
    if (!this.state.showMask) {
      return null;
    }
    return (
      <View style={styles.mainContainer}>
        <Touchable
          feedback="none"
          native={false}
          style={{ flex: 1 }}
          onPress={onTapOut}
        >
          <Animated.View
            style={[
              styles.mask,
              {
                opacity: this.state.opacity,
              },
            ]}
          />
        </Touchable>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                {
                  translateY: this.state.deltaY,
                },
              ],
            },
          ]}
        >
          <View style={{ height: BORDERHEIGHT, backgroundColor: '#F1F1F1' }}>
          {
              topRow ? topRow :
                <View style={styles.borderContainer}>
                    <Touchable feedback="opacity" onPress={onPressDone}>
                        <Text style={[styles.doneButton, doneButtonTextStyle]}>Done</Text>
                    </Touchable>
                </View>
          }
          </View>
          {this._renderPickerBasedOnType()}
        </Animated.View>
      </View>
    );
  }
}

const BORDERHEIGHT = 50;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
  },
  mask: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    position: 'absolute',
    bottom: 0 - HEIGHT,
    right: 0,
    left: 0,
    height: HEIGHT,
    borderTopWidth: 1,
    borderColor: 'lightgray',
  },
  borderContainer: {
    height: BORDERHEIGHT,
    paddingHorizontal: 17,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  bottomContainer: {
    backgroundColor: '#E2E2E2',
    height: HEIGHT - BORDERHEIGHT,
  },
  bottomContainerFlatList: {
    backgroundColor: '#E2E2E2',
    height: HEIGHT - BORDERHEIGHT,
    alignItems: 'center',
    paddingVertical: 25,
  },
  doneButton: {
    fontWeight: '600',
    fontSize: 20,
    color: '#0076FF',
  },
  flatlistButton: {
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    width: Dimensions.get('window').width,
  },
  flatlistButtonText: {
    fontSize: 22,
    color: 'gray',
  }
});
