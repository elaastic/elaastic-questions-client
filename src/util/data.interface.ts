export type LazyData<T> =
  { status: "NotLoadedYet" } |
  { status: "Loading" } |
  { status: "Loaded", value: T }
