import { Subheading as DefaultSubheading, Text as DefaultText } from "react-native-paper"
import { View as DefaultView } from "react-native"
import styled from "styled-components/native"

const checkIfFieldsExist = (props, fieldArray = []) => {
  return fieldArray.map(([field, cssString]) => {
    if (props[field]) {
      return cssString
    }
  })
}


export const Subheading = styled(DefaultSubheading)`
  margin-top: ${props => props.marginTop || 0}px;
  padding: ${props => props.padding || 0}px;
`

export const Text = styled(DefaultText)`
${props => checkIfFieldsExist(props, [
  ["bold", "font-weight: bold;"]
])}`

export const View = styled(DefaultView)`
  ${props => checkIfFieldsExist(props, [
  ["row", "flex-direction: row;"],
  ["centerx", "align-items: center; align-content: center;"],
  ["centery", "justify-content: center;"],
  ["wrap", "flex-wrap: wrap;"],
  ["height", `height: ${props.height}px;`],
  ["width", `width: ${props.width}px;`],
  ["flexGrow", "flex-grow: 1;"],
  ["justifyContent", `justify-content: ${props.justifyContent};`],
  ["backgroundColor", `background-color: ${props.backgroundColor};`],
  ["marginy", `margin-top: ${props.marginy}px; margin-bottom: ${props.marginy}px;`],
  ["marginx", `margin-left: ${props.marginx}px; margin-right: ${props.marginx}px;`],
  ["maxWidth", `max-width: ${props.maxWidth}px;`],
  ["shrink", "flex-shrink: 1;"]
])
  }
`

