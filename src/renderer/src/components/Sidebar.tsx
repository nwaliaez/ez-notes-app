// import React, { useState } from 'react'
// import { Note } from '../global'
// import { PanelRight, X, Trash } from 'lucide-react'
// import { stripHTML } from '../lib/utils'
// import { Link } from 'react-router-dom'

// interface SidebarProps {
//   notes: Note[]
//   onSelectNote: (id: string) => void
//   onDeleteNote: (id: string) => void // Add a prop for deleting a note
// }

// const Sidebar: React.FC<SidebarProps> = ({ notes, onDeleteNote }) => {
//   const [isCollapsed, setIsCollapsed] = useState(true)

//   const handleToggle = () => {
//     setIsCollapsed(!isCollapsed)
//   }

//   const handleNoteOpen = (id: string) => {
//     setIsCollapsed(true)
//     // onSelectNote(id)
//   }

//   // Format date to show time (e.g., "8:37 PM") or date (e.g., "11/5/24")
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     const isToday = date.toDateString() === new Date().toDateString()
//     return isToday
//       ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       : date.toLocaleDateString()
//   }

//   return (
//     <div
//       className={`fixed left-0 top-0 z-10 h-full bg-[#18181a] text-white transition-all duration-300 ${
//         isCollapsed ? 'w-0' : 'w-64'
//       }`}
//     >
//       <div className="flex flex-col h-full">
//         {/* Header */}
//         <div className="flex items-center justify-between p-2 flex-shrink-0">
//           {!isCollapsed && <h2 className="text-lg font-bold">Notes</h2>}
//           <button onClick={handleToggle} className="focus:outline-none">
//             {isCollapsed ? (
//               <PanelRight className="h-6 w-6 cursor-pointer opacity-50 hover:opacity-100" />
//             ) : (
//               <X className="h-6 w-6 cursor-pointer" />
//             )}
//           </button>
//         </div>

//         {/* Scrollable Notes List */}
//         <div className="flex-1 overflow-y-auto p-2">
//           {notes.map((note) => (
//             <div key={note.id} className="relative group">
//               <Link to={`/notes/${note.id}`}>
//                 <div
//                   className="p-2 cursor-pointer hover:bg-gray-700 rounded mb-2 flex items-center"
//                   onClick={() => handleNoteOpen(note.id)}
//                 >
//                   <div className="flex-1">
//                     <p className="text-sm font-medium">
//                       {note.title.substring(0, 35) || 'Untitled Note'}
//                       {note.title.length > 35 ? '...' : ''}
//                     </p>
//                     <p className="text-xs text-gray-400">{formatDate(note.updatedAt as string)}</p>
//                     <p className="text-xs text-gray-300 mt-1 line-clamp-2">
//                       {stripHTML(note.content).substring(0, 50)}
//                       {stripHTML(note.content).length > 50 ? '...' : ''}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//               {/* Delete Icon */}
//               <button
//                 className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
//                 onClick={(e) => {
//                   e.preventDefault() // Prevents navigation
//                   onDeleteNote(note.id)
//                 }}
//               >
//                 <Trash className="h-4 w-4" />
//               </button>
//             </div>
//           ))}

//           {/* Create New Note Link */}
//           <Link to="/create">
//             <div className="p-2 cursor-pointer hover:bg-gray-700 rounded">
//               <p className="text-sm font-medium">+ Create New Note</p>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Sidebar

const Sidebar = () => {
  return <div>Sidebar</div>
}

export default Sidebar
