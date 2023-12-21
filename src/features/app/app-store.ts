/* eslint-disable no-param-reassign */
import create from 'zustand';
import produce from 'immer';

interface State {
  ui: {
    isLayoutRendered: boolean;
  };
  demo: {
    isDemo?: boolean;
  };
  tutorial: {
    isOn?: boolean;
  };
  setIsLayoutRendered: (value: boolean) => void;
  setIsDemo: (value: boolean) => void;
  setTutorialIsOn: (value: boolean) => void;
}

export const useStore = create<State>((set) => ({
  ui: {
    isLayoutRendered: true,
  },
  demo: {},
  tutorial: {
    isOn: false,
  },
  setIsLayoutRendered: (value) => set(produce((state) => {
    state.ui.isLayoutRendered = value;
  })),
  setIsDemo: (value) => set(produce((state) => {
    state.demo.isDemo = value;
  })),
  setTutorialIsOn: (value) => set(produce((state) => {
    state.tutorial.isOn = value;
  })),
}));

export const isLayoutRenderedSelector = (s: State) => s.ui.isLayoutRendered;
export const setIsLayoutRenderedSelector = (s: State) => s.setIsLayoutRendered;
export const isDemoSelector = (s: State) => s.demo.isDemo;
export const setIsDemoSelector = (s: State) => s.setIsDemo;
export const isTutorialOnSelector = (s: State) => s.tutorial.isOn;
export const setTutorialIsOnSelector = (s: State) => s.setTutorialIsOn;
