import React from "react"
import { View } from "react-native"
import { useForm } from "react-hook-form"
import { Button } from "react-native-paper"
import { CREATE_USER } from "../graphql/mutations"
import { useMutation } from "@apollo/client"
import TextField from "./TextField"

const NewUserForm = () => {

  const { control, handleSubmit, errors, setError } = useForm()

  const [createUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      const message = error.message.replace("GraphQL error:", "").trim()
      
      const fieldNames = [
        ["sähköpos", "email"],
        ["nim", "name"],
        ["salas", "password"],
        ["puhelinnum", "phonenumber"]
      ]

      fieldNames.forEach((field) => {
        if (message.toLowerCase().includes(field[0])) {
          setError(field[1], { message })
        }
      })
    },
    onCompleted: (data) => {
      console.log(data)
    }

  })

  const onSubmit = async (variables) => {
    await createUser({ variables: { ...variables } })
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
        required
      />

      <TextField
        control={control}
        label="Nimi"
        error={errors.name}
        autoCompleteType="name"
        autoCapitalize="words"
        name="name"
        required
      />

      <TextField
        control={control}
        label="Salasana"
        error={errors.password}
        autoCompleteType="password"
        secureTextEntry={true}
        name="password"
        required
      />

      <TextField
        control={control}
        label="Puhelinnumero"
        error={errors.phonenumber}
        autoCompleteType="tel"
        keyboardType="phone-pad"
        name="phonenumber"
        required
      />

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>Rekisteröidy</Button>
    </View >
  )
}

export default NewUserForm

