import React, { useState } from "react"
import { Dimensions } from "react-native"
import SeachList from "./SearchList"
import SearchChip from "./SearchChip"
import { useTheme } from "react-native-paper"


const SearchableDropdown = ({ items, fieldToSearch, onSelected, placeholder, icon, iconFamily, onClose }) => {

  const [search, setSearch] = useState("")
  const [visible, setVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const { height } = Dimensions.get("window")

  const handlePress = (value) => {
    onSelected(value)
    setSearch("")
    setSelectedItem(value)
    setVisible(false)
  }

  const { colors } = useTheme()

  const modalStyle = { height, backgroundColor: colors.background, }

  const filteredItems = search ? items.filter(item => item[fieldToSearch].toLowerCase().includes(search.toLowerCase())) : items

  const handleClose = () => {
    setSelectedItem(null)
    if (onClose) {
      onClose()
    }
  }

  return <SearchChip
    {...{ handleClose, modalStyle, visible, setVisible, selectedItem, setSelectedItem, placeholder, icon, iconFamily, search, setSearch }}
  >
    <SeachList {...{ fieldToSearch, search, handlePress }} items={filteredItems} />
  </SearchChip>
}

export default SearchableDropdown

