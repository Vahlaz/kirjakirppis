import React from "react"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { useTheme } from "react-native-paper"

export const turnToNumber = (string) => {
  return parseFloat(string.replace(",", ".").replace(/[^0-9.]/g, ""))
}

export const parseCondition = (conditionNumber) => {
  if (conditionNumber === 1) {
    return "Käytettävä"
  }
  if (conditionNumber === 2) {
    return "Hyvä"
  }
  if (conditionNumber === 3) {
    return "Erinomainen"
  }
  else {
    return "Väärin merkitty kuntoluokka"
  }
}

export const getIcon = (props, library) => {
  const { colors } = useTheme()

  let color = props.color

  if (!color) {
    color = colors.text
  } else if (["primary", "accent", "background", "surface", "text", "placeholder"].includes(color)) {
    color = colors[color]
  }

  props = { ...props, color, size: props.size || 24 }
  if (library === "ioni") {
    return <Ionicons {...props} />
  }
  return <MaterialCommunityIcons {...props} />
}


export const errorParser = (error, setError, fields) => {
  const message = error.message.replace("GraphQL error:", "").trim()

  const fieldNames = [
    ["sähköpos", "email"],
    ["nim", "name"],
    ["salas", "password"],
    ["puhelinnum", "phonenumber"],
    ["lisäti", "information"],
    ["hint", "price"]
  ]

  fieldNames.forEach((field) => {
    if (message.toLowerCase().includes(field[0]) && fields.includes(field[1])) {
      setError(field[1], { message })
    }
  })
}