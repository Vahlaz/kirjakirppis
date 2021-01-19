import React from "react"
import { Searchbar, Chip, Modal, Portal, ThemeProvider, useTheme } from "react-native-paper"
import { getIcon } from "../utils/functions"
import { View, Text } from "./styled"

const SearchChip = ({ placeholder, icon, iconFamily, setSearch, handleClose, onSubmit, visible, setVisible, selectedItem, children, modalStyle }) => {

  const theme = useTheme()

  const CustomChip = ({ hasClose, onPress, text }) => (
    <View row centerx centery marginy={20}>
      <Chip icon={() => getIcon({ name: icon, color: theme.colors.text }, iconFamily)} onPress={onPress} style={{ backgroundColor: theme.colors.primary }} mode="outlined">
        <View row maxWidth={240}>
          <Text numberOfLines={1} ellipsizeMode="tail">{text}</Text>
        </View>
        {hasClose && getIcon({ name: "close", size: 20 }, "ioni")}
      </Chip>
    </View>
  )

  return <ThemeProvider theme={theme}>
    {
      selectedItem ? <CustomChip onPress={handleClose} text={selectedItem} hasClose />
        :
        <View>
          <Portal>
            <Modal onDismiss={() => setVisible(false)} visible={visible} contentContainerStyle={{ padding: 20, ...modalStyle }} >
              <View>
                <Searchbar
                  icon={() => getIcon({ name: "search" }, "ioni")}
                  placeholder={placeholder || "Etsi"}
                  onChangeText={(text) => setSearch(text)}
                  clearIcon={() => getIcon({ name: "close", onPress: () => setVisible(false) }, "ioni")}
                  autoFocus
                  onSubmitEditing={onSubmit}
                />
                {children}
              </View >
            </Modal>
          </Portal>
          <CustomChip onPress={() => setVisible(true)} text={placeholder} />
        </View>
    }
  </ThemeProvider>
}

export default SearchChip

