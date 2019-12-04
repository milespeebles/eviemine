const buttonBase = {
  color: 'black',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'black',
}

const buttonPrimary = Object.assign ({}, buttonBase)
const buttonSubmit = Object.assign ({}, buttonBase)
const buttonSubmitDisabled = Object.assign ({}, buttonSubmit)

export default {
  text: {
    label: {
      color: 'inherit',
    },
    error: {
      color: 'tomato',
    }
  },
  buttons: {
    primary: buttonPrimary,
    submit: buttonSubmit,
    'submit_disabled': buttonSubmitDisabled,
  },
  // breakpoints: ['40em', '52em', '64em'],
  // fontSizes: [
  //   12, 14, 16, 20, 24, 32, 48, 64,
  // ],
  // colors: {
  //   blue: '#07c',
  //   lightgray: '#f6f6ff',
  // },
  // space: [
  //   0, 4, 8, 16, 32, 64, 128, 256,
  // ],
  // fonts: {
  //   body: 'sans-serif',
  //   heading: 'inherit',
  //   monospace: 'Menlo, monospace',
  // },
  // fontWeights: {
  //   body: 400,
  //   heading: 700,
  //   bold: 700,
  // },
  // lineHeights: {
  //   body: 1.5,
  //   heading: 1.25,
  // },
  // shadows: {
  //   small: '0 0 4px rgba(0, 0, 0, .125)',
  //   large: '0 0 24px rgba(0, 0, 0, .125)',
  // },
  // variants: {
  //   form-label
  //   form-group
  //   form-group_error
  //   form-group-item
  //   form-label-symbol
  //   form-label-symbol_error
  //   form-input
  //   form-input_error
  //   form-select
  //   form-select_error
  //   form-captcha
  //   form-captcha_error
  //   form-error
  // },
  // text: {
  // },
}
