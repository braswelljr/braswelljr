import { ReactNode } from 'react';

export interface EditorTabItemI {
  name: string;
  open: boolean;
  saved?: boolean;
  className?: string;
}

export interface EditorTabI {
  Component?: keyof JSX.IntrinsicElements;
  primary: EditorTabItemI;
  secondary?: EditorTabItemI[];
  showTabMarkers?: boolean;
  side?: 'left' | 'right';
  translucent?: boolean;
  children?: ReactNode;
}

export interface EditorCodeWindowI {
  name: string;
  open: boolean;
  saved?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface TokenI {
  type: string;
  value: string;
}

export interface PageI {
  filename: string;
  saved?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface TextEditorI {
  children?: PageI[];
  className?: string;
}
