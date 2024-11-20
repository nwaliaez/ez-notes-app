// // src/renderer/pages/CreateNote.tsx

// import React, { useRef } from 'react'
// import Tiptap from '../components/TipTap'
// import { useNoteManager } from '@renderer/hooks/useNoteManager'
// import TitleInput from '@renderer/components/TitleInput'

// const CreateNote: React.FC = () => {
//   const tiptapRef = useRef<any>(null) // Replace 'any' with the actual type if available
//   const { title, handleTitleChange, handleContentChange } = useNoteManager()

//   return (
//     <div className="p-4">
//       {/* Title Input */}
//       <TitleInput
//         title={title}
//         handleTitleChange={handleTitleChange}
//         handleInputKeyDown={(e) => {
//           if (e.key === 'Enter') {
//             e.preventDefault()
//             tiptapRef.current?.focus()
//           }
//         }}
//       />

//       {/* Tiptap Editor */}
//       <div className="mt-4">
//         <Tiptap content="" ref={tiptapRef} onContentChange={handleContentChange} />
//       </div>
//     </div>
//   )
// }

// export default CreateNote

const CreateNote = () => {
  return <div>CreateNote</div>
}

export default CreateNote
