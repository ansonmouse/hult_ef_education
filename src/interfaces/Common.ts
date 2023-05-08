export type ReadonlyProps<T> = {
  readonly [key in keyof T]: T[key];
};
