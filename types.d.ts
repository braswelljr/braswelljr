declare module 'tinytime' {
  interface TinyTime {
    render: (date: Date) => string;
  }

  interface TinyTimeOptions {
    padHours?: boolean;
    padDays?: boolean;
    padMonth?: boolean;
  }

  declare const tinytime: (template: string, options: TinyTimeOptions) => TinyTime;

  export default tinytime;
}

declare module '*.css';
declare module '*.scss';
declare module '*.sass';
