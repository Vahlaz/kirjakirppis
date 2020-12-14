import React, { useState } from "react"
import { View } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { TextInput, Button } from "react-native-paper"
import DropDown from "react-native-paper-dropdown"
import NumberFormat from "react-number-format"
import SearchableDropdown from "./SearchableDropdown"
import books from "../assets/books.json"
import { useMutation } from "@apollo/client"
import { CREATE_LISTING } from "../graphql/mutations"

const NewListingForm = () => {
  const { control, handleSubmit, errors } = useForm()

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
    data.price = parseFloat(data.price.replace(",", ".").replace(/[^0-9.]/g, ""))
    console.log(data.price)
    createListing({ variables: { ...book, ...data } })
  }

  return (
    <View style={{ justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap", height: 500 }} >
      <SearchableDropdown
        items={books}
        fieldToSearch="title"
        onSelected={(bookTitle) => setBook(books.find(book => book.title === bookTitle))}
        placeholder="Myytävä kirja"
      />
      <View style={{ flexDirection: "row", width: 320, justifyContent: "space-between" }}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <NumberFormat
              style={{ width: 140 }}
              label="hinta"
              mode={"outlined"}
              onChangeText={value => onChange(value)}
              value={value}
              customInput={TextInput}
              thousandSeparator=" "
              suffix="€"
              onBlur={onBlur}
              decimalSeparator=","
              allowNegative={false}
              fixedDecimalScale={true}
              decimalScale={2}
            />
          )}
          name="price"
          rules={{ required: true }}
          defaultValue="0"
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
              right: <TextInput.Icon name={"menu-down"} />,
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
            error={errors.description}
            multiline={true}
            numberOfLines={8}
          />
        )}
        name="description"
        defaultValue=""
      />

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Tee ilmoitus
      </Button>
    </View >
  )
}

export default NewListingForm

