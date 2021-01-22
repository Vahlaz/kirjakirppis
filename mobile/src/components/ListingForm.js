import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Button, ActivityIndicator, TextInput, useTheme } from "react-native-paper"
import DropDown from "react-native-paper-dropdown"
import SearchableDropdown from "./SearchableDropdown"
import books from "../assets/books.json"
import { useMutation } from "@apollo/client"
import { CREATE_LISTING } from "../graphql/mutations"
import useSchool from "../hooks/useSchool"
import useUserInfo from "../hooks/useUserInfo"
import { turnToNumber, getIcon, errorParser } from "../utils/functions"
import TextField from "./TextField"
import { View } from "./styled"

const ListingForm = ({ setShowForm }) => {
  const { control, handleSubmit, errors, setError } = useForm()

  const { school } = useSchool()
  const { userInfo } = useUserInfo()

  const [book, setBook] = useState(null)
  const [condition, setCondition] = useState(2)
  const [showDropDown, setShowDropDown] = useState(false)

  const [createListing, { loading }] = useMutation(CREATE_LISTING, {
    refetchQueries: ["allListings"],
    onError: (error) => {
      errorParser(error, setError, ["information", "price"])
    }
  })

  const theme = useTheme()

  const conditionList = [
    { label: "Erinomainen", value: 3 },
    { label: "Hyvä", value: 2 },
    { label: "Käytettävä", value: 1 },
  ]

  const onSubmit = async data => {
    data.price = turnToNumber(data.price)
    await createListing({ variables: { ...book, ...data, condition, school, user: userInfo.id } })
    setShowForm(false)
  }

  return (
    <View centerx>
      <SearchableDropdown
        items={books}
        fieldToSearch="title"
        onSelected={(bookTitle) => setBook(books.find(book => book.title === bookTitle))}
        placeholder="Valitse myytävä kirja"
        icon="book"
      />
      <View row justifyContent="space-between" width={320}>
        <TextField
          control={control}
          label="Hinta"
          error={errors.price}
          keyboardType="numeric"
          name="price"
          defaultValue="0,00"
          width={140}
          required
        />

        <View width={140}>
          <DropDown
            label={"*Kunto"}
            mode={"outlined"}
            value={condition}
            setValue={setCondition}
            list={conditionList}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            inputProps={{
              right: <TextInput.Icon icon={() => getIcon({ name: "menu-down" })} />,
            }}
            activeColor={theme.colors.text}
          />
        </View>
      </View>
      <TextField
        control={control}
        label="Lisätietoja"
        error={errors.information}
        multiline={true}
        numberOfLines={8}
        name="information"
      />

      <Button mode="contained" style={{ elevation: 0 }} onPress={handleSubmit(onSubmit)}>
        Tee ilmoitus
      </Button>

      {loading && <ActivityIndicator style={{ marginTop: 10 }} animating />}
    </View >
  )
}

export default ListingForm

