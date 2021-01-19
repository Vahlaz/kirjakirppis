import React, { useState } from "react"
import SearchChip from "./SearchChip"

const SearchBar = ({ setSearch, search, ...props }) => {

  const [visible, setVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const onSubmit = () => {
    setSelectedItem(search)
    setVisible(false)
  }

  const handleClose = () => {
    setSelectedItem(null)
    setSearch("")
  }

  return <SearchChip {...{ setSearch, search, onSubmit, handleClose, visible, setVisible, selectedItem, setSelectedItem, ...props }} />
}

export default SearchBar

