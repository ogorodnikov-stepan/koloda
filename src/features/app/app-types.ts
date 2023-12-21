import { ReactNode } from 'react';

export type Domain = 'app' | 'auth' | 'srs';

export type Operation = string;

export type Entity = string;

export type Schema = object;

export type RouterParams = Record<string, string>;

export type ComponentsList = Record<string, any>;

export interface BasicProps { children?: ReactNode }

export interface PageProps { isDemo?: boolean; }
