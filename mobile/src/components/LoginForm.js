import React, { useEffect } from "react"
import { View } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { TextInput, Button } from "react-native-paper"
import useSignIn from "../hooks/useSignIn"

const LoginForm = () => {

  const { control, handleSubmit, errors } = useForm()

  const [signIn, result] = useSignIn()

  const onSubmit = (data) => signIn(data)

  useEffect(() => {
    console.log(result)
  }, [result])

  return (
    <View style={{ justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap", height: 500 }} >
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={{ width: 320 }}
            mode={"outlined"}
            label="Käyttäjänimi"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            error={errors.username}
            autoCompleteType="username"
          />
        )}
        name="username"
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={{ width: 320 }}
            mode={"outlined"}
            label="Salasana"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            error={errors.password}
            autoCompleteType="password"
            secureTextEntry={true}
          />
        )}
        name="password"
        defaultValue=""
      />

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Kirjaudu
      </Button>
    </View >
  )
}

export default LoginForm

