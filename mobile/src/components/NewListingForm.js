import React, { useState } from "react"
import { View } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { TextInput, Button } from "react-native-paper"
import DropDown from "react-native-paper-dropdown"
import NumberFormat from "react-number-format"
import SearchableDropdown from "./SearchableDropdown"
import books from "../assets/books.json"

const NewListingForm = () => {
  const { control, handleSubmit, errors } = useForm()

  const [book, setBook] = useState(null)
  const [condition, setCondition] = useState(2)
  const [showDropDown, setShowDropDown] = useState(false)

  const conditionList = [
    { label: "Erinomainen", value: 3 },
    { label: "Hyvä", value: 2 },
    { label: "Käytettävä", value: 1 },
  ]

  const onSubmit = data => console.log(data)

  /*
  Book infos

  User

  Price
  Information
  Condition

  Series
  Title
  Publisher
  Subject
  */

  return (
    <View style={{ flex: "column", justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap", height: 500 }}>
      <View >
        <SearchableDropdown
          items={books}
          fieldToSearch="title"
          onSelected={(book) => setBook(book)}
          placeholder="Myytävä kirja"
        />
      </View>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <NumberFormat
            style={{ width: 300 }}
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


      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={{ width: 300 }}
            mode={"outlined"}
            label="Lisätietoja"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            error={errors.description}
            multiline={true}
            numberOfLines={4}
          />
        )}
        name="description"
        defaultValue=""
      />

      <View style={{ width: 300 }}>
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

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Tee ilmoitus
      </Button>
    </View>
  )
}

export default NewListingForm

