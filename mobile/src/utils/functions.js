import React from "react"
import { MaterialCommunityIcons } from "@expo/vector-icons"

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

export const getIcon = (name, color) => {
  return <MaterialCommunityIcons name={name} size={24} color={color || "white"} />
}

