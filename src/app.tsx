import logo from './assets/logo-nlw-expert.svg'
import {NoteCard} from "./components/note-card.tsx";
import {NewNoteCard} from "./components/new-note-card.tsx";
import {ChangeEvent, useState} from "react";

interface Note {
  id: string
  date: Date
  content: string
}

export function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(()=>{
    const notesOnStorage = localStorage.getItem('notes')
    if(notesOnStorage){
      return JSON.parse(notesOnStorage)
    }
    return []
  })

  function handleSearch(e:ChangeEvent<HTMLInputElement>){
    const query = e.target.value
    setSearch(query)
  }

  const filteredSearch = search !== '' ?
    notes.filter(note=>note.content.toLowerCase().includes(search.toLowerCase())) :
    notes

  function onNoteCreated(content: string){
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content
    }
    const notesArray = [newNote, ...notes]
    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleRemoveNote(id:string){
    const notesArray = notes.filter(note=>note.id!==id)
    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} alt="NLW Expert"/>
      <form className="w-full">
        <input
          type="text"
          className="w-full bg-transparent text-3xl font-semibold
          tracking-tight outline-none placeholder:text-slate-500"
          placeholder='Busque em suas notas...'
          onChange={handleSearch}
        />
      </form>
      <div className="h-px bg-slate-700"/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated}/>
        {filteredSearch.map(note=><NoteCard key={note.id} note={note} handleRemoveNote={handleRemoveNote}/>)}
      </div>
    </div>
  )
}
