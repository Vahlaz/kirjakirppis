import React, { useState } from "react"
import { Controller } from "react-hook-form"
import { TextInput, HelperText, Button } from "react-native-paper"
import { getIcon } from "../utils/functions"

const TextField = ({ control, error, width, name, required, label, defaultValue, password, ...props }) => {

  if (error && error.type === "required") {
    error.message = "Pakollinen kenttä"
  }

  const [passwordIsVisible, setPasswordIsVisible] = useState(password)

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
          secureTextEntry={passwordIsVisible}
          right={password ?
            < TextInput.Icon
              icon={() => getIcon({ name: passwordIsVisible ? "eye-off-outline" : "eye-outline"}, "ioni")}
              onPress={() => setPasswordIsVisible(!passwordIsVisible)}
            /> : null
          }
          {...props}
        />)
      }
      name={name}
      defaultValue={defaultValue ? defaultValue : ""}
      rules={{ required }}
    />
    { error && <HelperText type="error">{error.message}</HelperText>}
  </>
}

export default TextField

