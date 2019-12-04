import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import {
  useFirestoreConnect,
  useFirestore,
  useFirebase,
  isLoaded,
} from 'react-redux-firebase'
import path from 'ramda/src/path'
import { Box, Button } from 'rebass'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import usePreload from 'toolbelt/hooks/use-preload'
import { selectAuth } from 'toolbelt/selectors/select-firebase'
import { selectData } from 'toolbelt/selectors/select-firestore'
import Form from 'toolbelt/components/form'
import Label from 'toolbelt/components/label'
import Input from 'toolbelt/components/input'
import Captcha from 'toolbelt/components/captcha'
import Submit from 'toolbelt/components/submit'
import PHONE_VALIDATION from 'toolbelt/constants/phone-validation'

import { preload } from '../app'

const addDefaultCountryCode =
  phone => {
    const firstChar = phone.charAt (0)

    if (firstChar === '+') return phone

    return `+1${phone}`
  }

const selectNumber = createSelector (
  selectData,
  data => path (['test', 'foo', 'number'], data)
)

const SpacedButton =
  props => <Button mr={2} {...props} />

const Page =
  state => {
    // firebase
    useFirestoreConnect (['test'])
    const firebase = useFirebase ()
    const firestore = useFirestore ()

    // state
    const [step, setStep] = useState ('login') // login, verify
    const [phone, setPhone] = useState ('')
    const [code, setCode] = useState ('')
    const [counter, setCounter] = useState (0)
    const { auth, number } = usePreload (state, {
      auth: selectAuth,
      number: selectNumber,
    })

    // mutators
    const addToCounter =
      amount => () => setCounter (counter + amount)

    const subtractFromCounter =
      amount => () => setCounter (counter - amount)

    const updateNumber =
      () => firestore.collection ('test')
        .doc ('foo')
        .set ({ number: counter })

    const resetForm =
      () => {
        setPhone ('')
        setStep ('login')
      }

    // handlers
    const handleChangePhone =
      ({ target: { value } }) => setPhone (value)

    const handleChangeCode =
      ({ target: { value } }) => setCode (value)

    const handleLogin =
      () => firebase.auth ()
        .signInWithPhoneNumber (
          addDefaultCountryCode (phone),
          window.recaptchaVerifier,
        )
        .then (confirmationResult => {
          window.confirmationResult = confirmationResult
          setStep ('verify')
        })
        .catch (error => {
          console.error (error)
        })

    const handleVerify =
      () => window.confirmationResult.confirm (code)
        .then (result => console.log (result))
        .catch (error => {
          console.error (error)
        })

    // render
    const renderLogin =
      () => {
        if (step === 'login' && !isLoaded (auth)) {
          return (
            <Form onSubmit={handleLogin}>
              <Label
                name='phone'
                text='phone number'
              />
              <Input
                mb={2}
                name='phone'
                type='tel'
                value={phone}
                onChange={handleChangePhone}
              />
              <Captcha mb={2} onExpire={resetForm} />
              <Submit text='submit' />
            </Form>
          )
        }
      }

    const renderVerify =
      () => {
        if (step === 'verify' && !isLoaded (auth)) {
          return (
            <Form onSubmit={handleVerify}>
              <Label
                name='verify'
                text='verification code'
              />
              <Input
                mb={2}
                name='verify'
                type='text'
                value={code}
                onChange={handleChangeCode}
              />
              <Submit text='verify' />
            </Form>
          )
        }
      }

    const renderLoggedIn =
      () => {
        if (isLoaded (auth)) {
          return (
            <>
              <Box>local: {counter}</Box>
              <Box>db: {number}</Box>
              <SpacedButton onClick={subtractFromCounter (1)}>subtract</SpacedButton>
              <SpacedButton onClick={addToCounter (1)}>add</SpacedButton>
              <Button onClick={updateNumber}>update</Button>
            </>
          )
        }
      }

    return (
      <>
        {renderLogin ()}
        {renderVerify ()}
        {renderLoggedIn ()}
      </>
    )
  }

// TODO:
// * persist user id and session token in cookie (client / nookie)
// * verify session token (server side)
// * get user info (server side)

Page.getInitialProps =
  async () => {
    const state = await preload (['test'])

    const number = selectNumber (state)

    return { number }
  }

export default Page
