import QuickPicker from './QuickPicker';
import { TextStyle, StyleProp, ViewStyle } from 'react-native';

export interface PickerStore {
  isOpen: boolean;
  pickerComponent: QuickPicker | null;
  open: (pickerOptions: PickerOptions) => void;
  close: any;
  pickerOptions: PickerOptions;
}

export interface Item {
  value: string | number;
  label: string;
}

export interface PickerOptions {
  onTapOut?: () => void;
  items?: Item[];
  item?: Item | null;
  onChange?: (item: Item | Date) => void;
  doneButtonTextStyle?: TextStyle;
  onPressDone?: (item: Item | Date) => void;
  doneButtonText?: string;
  disableTopRow?: boolean;
  topRow?: React.ReactNode;

  pickerType?: 'normal' | 'time';
  pickerStyleType?: any;
  itemStyle?: StyleProp<TextStyle>;

  date?: Date;
  mode?: 'date' | 'time' | 'datetime' | 'countdown';
  display?: 'default' | 'spinner' | 'calendar' | 'clock';
  maximumDate?: Date;
  minimumDate?: Date;
  timeZoneOffsetInMinutes?: number;
  locale?: string;
  is24Hour?: boolean;
  minuteInterval?: 1 | 2 | 6 | 5 | 4 | 3 | 10 | 12 | 15 | 20 | 30;

  cancelButtonText?: string;

  androidModalStyle?: StyleProp<ViewStyle>;
  androidItemStyle?: StyleProp<ViewStyle>;
  androidItemTextStyle?: StyleProp<TextStyle>;
  androidSelectedItemStyle?: StyleProp<ViewStyle>;
  useNativeDriver?: boolean;
}

const initialPickerOptions: PickerOptions = {
  onTapOut: undefined,
  items: [],
  item: undefined,
  onChange: undefined,
  doneButtonTextStyle: undefined,
  onPressDone: undefined,
  doneButtonText: undefined,
  disableTopRow: undefined,
  pickerType: 'normal',
  pickerStyleType: undefined,
  itemStyle: undefined,

  date: undefined,
  mode: undefined,
  display: undefined,
  maximumDate: undefined,
  minimumDate: undefined,
  timeZoneOffsetInMinutes: undefined,
  locale: undefined,
  is24Hour: undefined,
  minuteInterval: undefined,
  cancelButtonText: undefined,

  androidModalStyle: undefined,
  androidItemStyle: undefined,
  androidItemTextStyle: undefined,
  androidSelectedItemStyle: undefined,

  useNativeDriver: true,
};

const pickerStore: PickerStore = {
  isOpen: false,
  pickerComponent: null,
  pickerOptions: { ...initialPickerOptions },
  open: (pickerOptions: PickerOptions) => {
    if (pickerStore.pickerComponent) {
      pickerStore.pickerComponent._open();
      pickerStore.pickerOptions = { ...initialPickerOptions, ...pickerOptions };
    }
  },
  close: () => {
    if (pickerStore.pickerComponent) {
      pickerStore.pickerComponent._close();
      pickerStore.pickerOptions = { ...initialPickerOptions };
    }
  },
};

export default pickerStore;

export const ANIMATION_DURATION = 250;
