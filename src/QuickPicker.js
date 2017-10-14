// @flow

import React from 'react';
import { StyleSheet, Animated, View, Text, Picker } from 'react-native';
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

type StateType = {
  isOpen: boolean,
  onValueChange: Function,
  onTapOut: ?Function,
  onPressDone: ?Function,
  items: Array<string>,
  selectedValue: ?string,
  backgroundColor: string,
  topRow: any,
  textStyle: ?Object,
  doneButtonTextStyle: ?Object,
  useNativeDriver: boolean,
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
    pickerStore.updateSubscriber();
  },
  openPicker: (
    newitems: ?Array<string>,
    newselectedValue: ?string,
    newonValueChange: ?Function,
    newbackgroundColor: ?string,
    newtopRow: any,
    newonPressDone: ?Function,
    newonTapOut: ?Function,
    newtextStyle: ?Object,
    newdoneButtonTextStyle: ?Object,
    newuseNativeDriver: boolean,
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
    pickerStore.openPicker(items, selectedValue, onValueChange, backgroundColor, topRow, onPressDone, onTapOut, textStyle, doneButtonTextStyle, useNativeDriver);
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
      }),
    );
  }

  componentWillUnmount() {
    pickerStore.removeSubscription(this._pickerStoreId);
  }  

  render() {
    const { isOpen, selectedValue, onValueChange, items, backgroundColor, topRow, onPressDone, onTapOut, textStyle, doneButtonTextStyle, useNativeDriver } = this.state;
    return (
        <Pick
            isOpen={isOpen}
            onPressDone={onPressDone || GlobalPicker.close}
            onTapOut={onTapOut || GlobalPicker.close}
            selectedValue={selectedValue || null}
            onValueChange={onValueChange || null}
            items={items || []}
            backgroundColor={backgroundColor}
            topRow={topRow}
            textStyle={textStyle}
            doneButtonTextStyle={doneButtonTextStyle}
            useNativeDriver={useNativeDriver || false}
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
};

class Pick extends React.Component {
  state = {
    deltaY: new Animated.Value(0),
    opacity: new Animated.Value(0),
    showMask: false,
  };
  props: PickProps;
  _maskTimeout = null;

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
          this._Open();
          this._fadeIn();
        });
      } else {
        this._fadeOut();
        this._Close();
      }
    }
  }

  render() {
    const { backgroundColor, topRow, onTapOut, onPressDone, textStyle, doneButtonTextStyle } = this.props;
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
          <View style={[styles.bottomContainer, { backgroundColor }]}>
            <Picker
              selectedValue={this.props.selectedValue}
              onValueChange={itemValue => this.props.onValueChange(itemValue)}
              itemStyle={textStyle}
            >
              {this.props.items.map(item =>
                <Picker.Item key={item} label={item} value={item} />,
              )}
            </Picker>
          </View>
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
  doneButton: {
    fontWeight: '600',
    fontSize: 20,
    color: '#0076FF',
  },
});
