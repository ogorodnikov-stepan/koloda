import { ErrorInstance } from 'features/app/error/error';
import { EditbarVariant, EditbarMode } from 'features/app/ui/editbar/editbar';

export interface ReducerEntityStatus {
  isDemo?: boolean;
  editbar: {
    variant: EditbarVariant;
    mode: EditbarMode;
  };
  message: string;
  title?: string;
  isLoaded?: boolean;
  isSaved: boolean;
  isSaving?: boolean;
  isError?: boolean;
  canEdit?: boolean;
  canAdd?: boolean;
  discard: {
    // Indicates whether discard feature is available
    isEnabled?: boolean;
    // Indicates whether changes to discard exist
    isAvailable?: boolean;
    // Indicates whether ability to discard is currently available
    // e.g. unavailable due to request is being currently in progress
    isReady?: boolean;
  };
  display?: Record<string, any>;
}

export interface ReducerEntity<T, D = void> extends Record<string, any> {
  status: ReducerEntityStatus;
  error?: ErrorInstance | null;
  data?: T;
  backup?: T;
  draft?: D;
}

export interface ReducerReadOnlyEntity<T> {
  data?: T | null;
  isLoaded?: boolean;
}

export interface ReducerMeta extends Record<string, any> {
  isDemo?: boolean;
  tabs?: ReducerTabs;
  title?: string;
}

export interface ReducerTabs {
  selectedIndex?: number;
  headers?: string[];
  items: Record<string, any>;
}

export interface ReducerTab {
  index?: number;
  disabled?: boolean;
  selected?: boolean;
}

export interface ReducerState {
  meta: ReducerMeta;
}

export type ReducerAction = [string, any];

export type ReducerDispatch = (action: ReducerAction) => void;

export interface ReducerActions {
  [x: string]: (draft: any, payload: any) => void;
}
