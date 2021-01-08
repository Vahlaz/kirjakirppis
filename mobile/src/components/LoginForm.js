import React from "react"
import { View } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { TextInput, Button } from "react-native-paper"
import useAuth from "../hooks/useAuth"

const LoginForm = () => {

  const { control, handleSubmit, errors } = useForm()

  const { signIn } = useAuth()

  const onSubmit = (data) => signIn(data)

  return (
    <View style={{ justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap", height: 500, alignContent: "center" }} >
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

      <Button mode="contained " onPress={handleSubmit(onSubmit)}>
        Kirjaudu
      </Button>
    </View >
  )
}

export default LoginForm

