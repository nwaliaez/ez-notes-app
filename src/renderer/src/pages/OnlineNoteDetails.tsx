// import React, { useEffect, useRef, useState } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// // import TitleInput from '../components/TitleInput'
// import Tiptap from '../components/TipTap'
// import { useNoteManager } from '@renderer/hooks/useNoteManager'
// import { db } from '@renderer/firebase'
// import { doc, onSnapshot } from 'firebase/firestore'

// const OnlineNoteDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>()
//   const navigate = useNavigate()

//   const tiptapRef = useRef<any>(null) // Replace 'any' with the actual type if available

//   // Fetch the note on component mount
//   const { title, content, handleTitleChange, handleContentChange, handleSelectNote } =
//     useNoteManager()

//   const [docData, setDocData] = useState(content) // Initialize with content

//   useEffect(() => {
//     const fetchNote = async () => {
//       if (id) {
//         handleSelectNote(id)
//       }
//     }

//     fetchNote()
//   }, [id, navigate])

//   // Handle input key down (e.g., for shortcuts)
//   const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Escape') {
//       navigate('/')
//     }
//   }

//   useEffect(() => {
//     if (!id) return
//     console.log(id, '--id')

//     const docRef = doc(db, 'notes', id)

//     // Listen for real-time updates to the document
//     const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
//       if (docSnapshot.exists()) {
//         const data = docSnapshot.data()
//         console.log('Document data:', data)
//         setDocData(data.content) // Update the state with new content
//       } else {
//         console.log('No such document!')
//         setDocData('') // Clear if document no longer exists
//       }
//     })

//     // Clean up the listener on unmount
//     return () => unsubscribe()
//   }, [id]) // Re-run the effect if `id` changes

//   return (
//     <>
//       {/* Title Input */}
//       {/* <TitleInput
//         title={title}
//         handleTitleChange={handleTitleChange}
//         handleInputKeyDown={handleInputKeyDown}
//       /> */}
//       {/* Tiptap Editor */}
//       <Tiptap ref={tiptapRef} content={docData} onContentChange={handleContentChange} />
//     </>
//   )
// }

// export default OnlineNoteDetails

const OnlineNoteDetails = () => {
  return <div>OnlineNoteDetails</div>
}

export default OnlineNoteDetails
