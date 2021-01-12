import React from "react"
import { View } from "react-native"
import { useForm } from "react-hook-form"
import { Button } from "react-native-paper"
import useAuth from "../hooks/useAuth"
import TextField from "./TextField"

const LoginForm = () => {

  const { control, handleSubmit, errors } = useForm()

  const { signIn } = useAuth()

  const onSubmit = (data) => signIn(data)

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
        secureTextEntry={true}
        name="password"
      />

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Kirjaudu
      </Button>
    </View >
  )
}

export default LoginForm

