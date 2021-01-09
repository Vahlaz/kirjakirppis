import React, { useState } from "react"
import { View } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { TextInput, Button, Provider } from "react-native-paper"
import DropDown from "react-native-paper-dropdown"
import SearchableDropdown from "./SearchableDropdown"
import books from "../assets/books.json"
import { useMutation } from "@apollo/client"
import { CREATE_LISTING } from "../graphql/mutations"
import useSchool from "../hooks/useSchool"
import useUserInfo from "../hooks/useUserInfo"
import { turnToNumber } from "../utils/functions"
import { getIcon } from "../utils/functions"

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
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={{ width: 140 }}
                mode={"outlined"}
                label="Hinta"
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                error={errors.price}
                keyboardType="numeric"
              />
            )}
            name="price"
            rules={{ required: true }}
            defaultValue="0,00"
          />
          <View style={{ width: 140 }}>
            <DropDown
              label={"Kunto"}
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
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              style={{ width: 320 }}
              mode={"outlined"}
              label="Lisätietoja"
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              error={errors.information}
              multiline={true}
              numberOfLines={8}
            />
          )}
          name="information"
          defaultValue=""
        />

        <Button mode="contained" style={{ elevation: 0 }} onPress={handleSubmit(onSubmit)}>
          Tee ilmoitus
      </Button>
      </View >
    </Provider>
  )
}

export default ListingForm

