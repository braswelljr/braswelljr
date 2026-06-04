'use client';

import React from 'react';
import type { Editor } from '@tiptap/react';

export type ToolbarContextProps = {
  editor: Editor;
};

export const ToolbarContext = React.createContext<ToolbarContextProps | null>(null);

export type ToolbarProviderProps = {
  editor: Editor;
  children: React.ReactNode;
};

export const ToolbarProvider = ({ editor, children }: ToolbarProviderProps) => {
  return <ToolbarContext.Provider value={{ editor }}>{children}</ToolbarContext.Provider>;
};

export const useToolbar = () => {
  const context = React.useContext(ToolbarContext);

  if (!context) {
    throw new Error('useToolbar must be used within a ToolbarProvider');
  }

  return context;
};
