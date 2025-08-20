export type ParamsType = {
  label: string,
  href: string,
  level?: number,
  target?: string,
  disabled?: boolean,
  children?: Array<ParamsType>
}