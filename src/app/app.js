import createApp from 'toolbelt/firebase/create-app'

import theme from './theme'

import { firebaseConfig } from '../../config.js'

export const { App, store, preload } = createApp ({ theme, firebaseConfig })

