import React from "react"
import { Controller } from "react-hook-form"
import { TextInput, HelperText } from "react-native-paper"

const TextField = ({ control, error, width, name, required, label, defaultValue, ...props }) => {

  if (error && error.type === "required") {
    error.message = "Pakollinen kenttä"
  }

  return <>
    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => (
        <TextInput
          style={{ width: width || 320 }}
          mode={"outlined"}
          onBlur={onBlur}
          onChangeText={value => onChange(value)}
          value={value}
          error={error}
          label={`${required ? "*" : ""}${label}`}
          {...props}
        />
      )}
      name={name}
      defaultValue={defaultValue ? defaultValue : ""}
      rules={{ required }}
    />
    { error && <HelperText type="error">{error.message}</HelperText>}
  </>
}

export default TextField

