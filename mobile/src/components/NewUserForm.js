import React from "react"
import { View } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { TextInput, Button } from "react-native-paper"
import useSchool from "../hooks/useSchool"
import { CREATE_USER } from "../graphql/mutations"
import { useMutation } from "@apollo/client"

const NewUserForm = () => {

  const { control, handleSubmit, errors } = useForm()

  const [createUser] = useMutation(CREATE_USER)

  const { school } = useSchool()

  const onSubmit = async (variables) => {
    const { data } = await createUser({ variables: { ...variables, school } })
    console.log("RESPONSE", data)
  }

  const width = 320

  return (
    <View>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={{ width: 320 }}
            mode={"outlined"}
            label="Sähköposti"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            error={errors.email}
            autoCompleteType="email"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
        name="email"
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={{ width }}
            mode={"outlined"}
            label="Nimi"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            error={errors.name}
            autoCompleteType="name"
            autoCapitalize="words"
          />
        )}
        name="name"
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={{ width }}
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

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={{ width }}
            mode={"outlined"}
            label="Puhelinnumero"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            error={errors.phonenumber}
            autoCompleteType="tel"
            keyboardType="phone-pad"
          />
        )}
        name="phonenumber"
        defaultValue=""
      />

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>Rekisteröidy</Button>
    </View >
  )
}

export default NewUserForm

