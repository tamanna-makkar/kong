/* Common types among the components */
/* Header types */
export type Link = {
  icon: string,
  text: string,
  navigateTo: string
}

/* Button types */
export type ButtonStyle = 'primary' | 'secondary' | 'transparent' | 'white'

export type ButtonProps = {
  bgColor: string,
  hover: string,
  textColor: string,
}

export type ButtonStates = {
  'primary': ButtonProps,
  'secondary': ButtonProps,
  'transparent': ButtonProps
  'white': ButtonProps
}