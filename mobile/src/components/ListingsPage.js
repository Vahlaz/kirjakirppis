import React, { useEffect } from "react"
import ListingList from "./ListingList"
import { Subheading, View } from "./styled"
import { useState } from "react"
import SearchableDropdown from "./SearchableDropdown"
import books from "../assets/books.json"

const ListingsPage = ({ result, userInfo }) => {

  if (!result || result.loading || !result.data) {
    return null
  }

  let subjects = books.map(book => book.subject)

  subjects = [...new Set(subjects)]

  const [searchSubject, setSearchSubject] = useState(null)

  const [searchBook, setSearchBook] = useState(null)

  const [listings, setListings] = useState([])

  useEffect(() => {
    const allListings = result.data.allListings
    const notMyListings = allListings.filter(listing => listing.User.id !== userInfo.id)
    const listingsToShow = notMyListings.filter(listing => {
      console.log()
      if (searchSubject && listing.Subject !== searchSubject) {
        return false
      }
      if (searchBook && listing.Title !== searchBook) {
        return false
      }
      return true
    })
    setListings(listingsToShow)

  }, [searchSubject, searchBook, result])

  return (
    <View flexGrow>
      {listings && listings.length !== 0
        ? <ListingList listings={listings} />
        : <Subheading padding={20}>{searchSubject || searchBook ? "Haullasi ei löytynyt yhtään kirjaa" : "Koulullasi ei ole vielä yhtään myynti-ilmoitusta"}</Subheading>
      }
      <SearchableDropdown
        items={books}
        fieldToSearch="title"
        onSelected={(title) => setSearchBook(title)}
        placeholder="Etsi kirjan perusteella"
        icon="book-search"
        onClose={() => setSearchBook(null)}
        additionalKeyField="subject"
      ></SearchableDropdown>
      <SearchableDropdown
        items={subjects.map(subject => ({ subject }))}
        fieldToSearch="subject"
        onSelected={(subject) => setSearchSubject(subject)}
        onClose={() => setSearchSubject(null)}
        placeholder="Etsi aineen perusteella"
        icon="text-search"
      ></SearchableDropdown>
    </View>
  )
}

export default ListingsPage

