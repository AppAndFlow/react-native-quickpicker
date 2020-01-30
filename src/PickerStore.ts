import QuickPicker from './QuickPickerv2';
import { TextStyle } from 'react-native';

interface Item {
  value: string | number;
  label: string;
}

export interface PickerOptions {
  onTapOut?: () => void;
  items: Item[];
  value?: Item;
  onChange?: (item: Item) => void;
  doneButtonTextStyle?: TextStyle;
  onPressDone?: (item: Item) => void;
  doneButtonText?: string;
  disableTopRow?: boolean;
  topRow?: React.ReactNode;
}

export interface PickerStore {
  isOpen: boolean;
  pickerComponent: QuickPicker | null;
  open: (pickerOptions: PickerOptions) => void;
  close: any;
  pickerOptions: PickerOptions;
}

const initialPickerOptions: PickerOptions = {
  onTapOut: undefined,
  items: [],
  value: undefined,
  onChange: undefined,
  doneButtonTextStyle: undefined,
  onPressDone: undefined,
  doneButtonText: undefined,
  disableTopRow: undefined,
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
