import React from "react"
import { View } from "react-native"
import { useForm } from "react-hook-form"
import { Button } from "react-native-paper"
import useAuth from "../hooks/useAuth"
import TextField from "./TextField"
import { errorParser } from "../utils/functions"

const LoginForm = () => {

  const { control, handleSubmit, errors, setError } = useForm()


  const { signIn } = useAuth()

  const onSubmit = async (data) => {
    const error = await signIn(data)
    if (error) {
      errorParser(error, setError, ["email","password"])
    }
  }

  return (
    <View>
      <TextField
        control={control}
        label="Sähköposti"
        error={errors.email}
        autoCompleteType="email"
        autoCapitalize="none"
        keyboardType="email-address"
        name="email"
      />

      <TextField
        control={control}
        label="Salasana"
        error={errors.password}
        autoCompleteType="password"
        name="password"
        password
      />

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Kirjaudu
      </Button>
    </View >
  )
}

export default LoginForm

