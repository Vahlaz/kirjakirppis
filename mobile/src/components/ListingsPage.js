import React, { useEffect, useState } from "react"
import ListingList from "./ListingList"
import { Subheading, View } from "./styled"
import SearchableDropdown from "./SearchableDropdown"
import books from "../assets/books.json"
import SearchBar from "./SearchBar"
import {unique} from "../utils/functions"

const ListingsPage = ({ result, userInfo }) => {

  if (!result || result.loading || !result.data) {
    return null
  }

  let subjects = books.map(book => book.subject)

  const [searchTitle, setSearchTitle] = useState()

  subjects = unique(subjects)

  const [searchSubject, setSearchSubject] = useState(null)

  const [listings, setListings] = useState([])

  useEffect(() => {
    const allListings = result.data.allListings
    const notMyListings = allListings.filter(listing => listing.User.id !== userInfo.id)
    const listingsToShow = notMyListings.filter(listing => {
      console.log()
      if (searchSubject && listing.Subject !== searchSubject) {
        return false
      }
      if (searchTitle && !listing.Title.includes(searchTitle)) {
        return false
      }
      return true
    })
    setListings(listingsToShow)

  }, [searchSubject, searchTitle, result, userInfo])

  return (
    <View flexGrow>
      <View
        style={{
          position: "absolute",
          margin: 20,
          right: 0,
          bottom: 0,
          zIndex: 10
        }}
      >
        <SearchBar
          placeholder="Etsi nimen perusteella"
          icon="book-search"
          setSearch={setSearchTitle}
          search={searchTitle}
        ></SearchBar>
        <SearchableDropdown
          items={subjects.map(subject => ({ subject }))}
          fieldToSearch="subject"
          onSelected={(subject) => setSearchSubject(subject)}
          onClose={() => setSearchSubject(null)}
          placeholder="Etsi aineen perusteella"
          icon="text-search"
        ></SearchableDropdown>
      </View>
      {listings && listings.length !== 0
        ? <ListingList listings={listings} />
        : <Subheading padding={20}>{searchSubject || searchTitle ? "Haullasi ei löytynyt yhtään kirjaa" : "Koulullasi ei ole vielä yhtään myynti-ilmoitusta"}</Subheading>
      }

    </View>
  )
}

export default ListingsPage

