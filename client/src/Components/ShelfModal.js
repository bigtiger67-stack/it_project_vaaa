
/* eslint-disable no-unused-vars */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useAuthState } from 'react-firebase-hooks/auth'
import axios from 'axios'
import { ProgressBar } from 'react-loader-spinner'

import { uploadImage, downloadImage, storageRef, auth, logout, uploadImg } from '../firebase-setup'

export default function Modal ({ visible, onClose, fieldValues, shelves }) {
  const url = process.env.REACT_APP_API_URL
  const [r, setR] = useState(false) // Refresh state
  const [uploading, setUploading] = useState(false) // Refresh state
  // this prevents the modal , when clicked, automatically closes
  const [image, setImage] = useState(null)

  // console.log("sada",fieldValues.title)
  const handleOnClose = (e) => {
    if (e.target.id === 'modalContainer' || e.target.id === 'buttonID') onClose()
  }

  const getChecked = () => {
    const checked = []
    for (let i = 0; i < shelves.length; i++) {
      console.log(shelves[i])
      if (fieldValues.shelves.includes(shelves[i])) {
        checked.push(true)
      } else {
        checked.push(false)
      }
    }
    console.log('checked', checked)
    return checked
  }

  const [checkedState, setCheckedState] = useState(
    fieldValues ? getChecked() : new Array(shelves.length).fill(false)
  )

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    )

    setCheckedState(updatedCheckedState)
  }

  const [user, loading] = useAuthState(auth)

  const addNewShelf = async (data) => {
    return new Promise((resolve, reject) => {
      setR(true)
      user.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        axios.post(url + '/MyShelves/AddNewShelf', {
          currUID: user.uid,
          name: data.name
        }, {
          headers: {
            Authorization: 'Bearer ' + idToken
          }
        })
          .then(async (response) => {
            resolve(response)
          })
          .catch(error => console.error('Error: ', error))
      }).catch(function (error) {
        console.log('Error', error)
      })
    })
  }

  const updateShelf = async (data) => {
    setR(true)
    await user.getIdToken(/* forceRefresh */ true).then(function (idToken) {
      axios.post(url + '/MyBooks/UpdateTitle', {
        currUID: user.uid,
        title: data.title,
        author: data.author,
        image: data.image,
        shelves: data.shelves,
        bookID: fieldValues.bookID
      }, {
        headers: {
          Authorization: 'Bearer ' + idToken
        }
      })
        .then(response => {
          console.log(response)
          return response
        })
        .catch(error => console.error('Error: ', error))
    }).catch(function (error) {
      console.log('Error', error)
    })
  }

  if (!visible) return null

  const getChosenShelves = () => {
    const chosenShelves = ['All Books']
    for (let i = 0; i < shelves.length; i++) {
      if (checkedState[i]) {
        chosenShelves.push(shelves[i])
      }
    }
    return chosenShelves
  }

  const submitChanges = async (event) => {
    event.preventDefault()
    setUploading(true)
    // const downloadURL = await uploadImage(image)
    addNewShelf({ name: event.target[0].value }).then((response) => {
      console.log('Shelf added')
      onClose({ name: event.target[0].value, shelfID: response.data })
      setUploading(false)
      setImage(null)
    })
  }

  const submitUpdate = async (event) => {
    event.preventDefault()
    setUploading(true)
    // const downloadURL = await uploadImage(image)
    updateShelf({ name: event.target[0].value }).then((response) => {
      console.log('Shelf updated')
      onClose({ name: event.target[0].value, shelfID: response.data })
      setUploading(false)
      setImage(null)
    })
  }

  return (
        <div id='modalContainer'
        onClick ={handleOnClose}
        className="fixed inset-0 bg-bgDark bg-opacity-40 backdrop-blur-sm z-10 flex justify-center items-center">
            <div className ="bg-bgLight p-5 rounded">
                <p className="text-center mb-5">{fieldValues ? 'Update shelf' : 'Add shelf'}</p>
                <form onSubmit={fieldValues ? submitUpdate : submitChanges}>
                <div className="mb-6">
                    <label htmlFor="shelfName" className="block mb-2 text-sm font-medium text-fontDark">Shelf Name</label>
                    <input type="text" defaultValue={fieldValues ? fieldValues.title : ''} id="shelfName" className="bg-bgLight border border-bgMed text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Name" />
                </div>

                <div className="mb-6">
                  <div style={uploading ? { } : { display: 'none' }}><ProgressBar barColor="#147014" borderColor="#8c8c8b" height="100" width="100"/></div>
                </div>

                <button type="submit" className="text-white bg-buttonAdd hover:bg-buttonAddHover font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{fieldValues ? 'Update' : 'Add'}</button>
                <button id='buttonID' type="button" onClick={onClose} className="ml-12 text-gray-100 bg-buttonDelete hover:bg-buttonDeleteHover font-medium rounded-lg text-sm px-5 py-2.5">Cancel</button>
                </form>
            </div>

        </div>
  )
}

Modal.propTypes = { visible: PropTypes.bool, onClose: PropTypes.func, fieldValues: PropTypes.object, shelves: PropTypes.array }
