import React from 'react';
import { BasicProps } from 'features/app/app-types';
import SkeletonTitle from 'features/app/ui/skeleton/skeleton-title';

interface Props extends BasicProps {
  skeleton: boolean;
  title?: React.ReactNode;
}

export default function ContentHeader(props: Props) {
  return (
    <header>
      { props.skeleton ? (
        <SkeletonTitle />
      ) : (
        <h1>{props.title}</h1>
      )}
      {props.children}
    </header>
  );
}
