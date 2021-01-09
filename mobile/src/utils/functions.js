import React from "react"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"

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
  props = { ...props, color: props.color || "white", size: props.size || 24 }
  if (library === "ioni") {
    return <Ionicons {...props} />
  }
  return <MaterialCommunityIcons {...props} />
}
