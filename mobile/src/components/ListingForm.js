import React, { useState } from "react"
import { View } from "react-native"
import { useForm } from "react-hook-form"
import { Button, Provider } from "react-native-paper"
import DropDown from "react-native-paper-dropdown"
import SearchableDropdown from "./SearchableDropdown"
import books from "../assets/books.json"
import { useMutation } from "@apollo/client"
import { CREATE_LISTING } from "../graphql/mutations"
import useSchool from "../hooks/useSchool"
import useUserInfo from "../hooks/useUserInfo"
import { turnToNumber, getIcon } from "../utils/functions"
import TextField from "./TextField"

const ListingForm = () => {
  const { control, handleSubmit, errors } = useForm()

  const { school } = useSchool()
  const { userInfo } = useUserInfo()

  const [book, setBook] = useState(null)
  const [condition, setCondition] = useState(2)
  const [showDropDown, setShowDropDown] = useState(false)

  const [createListing] = useMutation(CREATE_LISTING)

  const conditionList = [
    { label: "Erinomainen", value: 3 },
    { label: "Hyvä", value: 2 },
    { label: "Käytettävä", value: 1 },
  ]

  const onSubmit = data => {
    data.price = turnToNumber(data.price)
    createListing({ variables: { ...book, ...data, condition, school, user: userInfo.id } })
  }

  return (
    <Provider>
      <View style={{ alignItems: "center", flexWrap: "wrap", height: 500, alignContent: "center" }} >
        <SearchableDropdown
          items={books}
          fieldToSearch="title"
          onSelected={(bookTitle) => setBook(books.find(book => book.title === bookTitle))}
          placeholder="Valitse myytävä kirja"
          icon="book"
          additionalKeyField="subject"
        />
        <View style={{ flexDirection: "row", width: 320, justifyContent: "space-between" }}>

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

          <View style={{ width: 140 }}>
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
                right: () => getIcon({ name: "menu-down" }),
              }}
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
      </View >
    </Provider>
  )
}

export default ListingForm

