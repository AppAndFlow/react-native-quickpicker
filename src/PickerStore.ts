import QuickPicker from './QuickPicker';
import { TextStyle, StyleProp } from 'react-native';

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
  items: Item[];
  item?: Item | null;
  onChange?: (item: Item) => void;
  doneButtonTextStyle?: TextStyle;
  onPressDone?: (item: Item) => void;
  doneButtonText?: string;
  disableTopRow?: boolean;
  topRow?: React.ReactNode;
  pickerType?: 'normal';
  pickerStyleType?: any;
  itemStyle?: StyleProp<TextStyle>;
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
