import { useEffect } from 'react';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { useDemoDeckQuery } from 'features/app/app-queries';
import { useImportDeckMutation } from 'features/srs/decks/decks-queries';
import { State } from './demo-reducer';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DemoSetupDecks({ state, dispatch }: Props) {
  const { decks: { load, add }, language } = state;
  const { data, isError } = useDemoDeckQuery({ language, name: load });
  const { mutate } = useImportDeckMutation({ isDemo: true });

  useEffect(() => { if (data) dispatch(['deckReceived', data]); }, [data]);

  useEffect(() => {
    if (add) {
      mutate(add, {
        onSuccess: (d) => { dispatch(['deckAdded', d]); },
        onError: () => { dispatch(['errorReceived', {}]); },
      });
    }
  }, [add]);

  useEffect(() => {
    if (isError) dispatch(['errorReceived', {}]);
  }, [isError]);

  return null;
}
