import "./App.css";
import { useState } from "react";

const App = () => {
	const [noteTitle, setNoteTitle] = useState("");
	const [notes, setNotes] = useState([]);
	const [editMode, setEditMode] = useState(false);
	const [editableNote, setEditableNote] = useState(null);

	const createHandler = (event) => {
		event.preventDefault();
		if (!noteTitle) {
			return alert("Please Enter Note Title");
		}
		const newNote = {
			id: Date.now() + "",
			title: noteTitle,
		};

		setNotes([...notes, newNote]); 
		setNoteTitle("");
		
	};
	const removeHandler = (noteId) => {
		
		const newNotes = notes.filter((note) => note.id !== noteId);
		setNotes(newNotes);
		
	};

	const editHandler = (note) => {
		setEditMode(true);
		setNoteTitle(note.title);
		setEditableNote(note);
	};

	const updateHandler = (event) => {
		event.preventDefault();

		if (!noteTitle.trim()) {
			return alert("Please Enter Note Title");
		}
		const updatedNotesArray = notes.map((note) => {
			if (note.id === editableNote.id) {
			
				return {
					...note,
					title: noteTitle,
				};
				
			}

			return note; 
		});
		
		setNotes(updatedNotesArray);
		setEditMode(false);
		setEditableNote(null);
		setNoteTitle("");
	};

	return (
		<div className="App mt-50">
			<form onSubmit={editMode ? updateHandler : createHandler}>
        <h1>Task App</h1>
				<input
					type="text"
					value={noteTitle}
					onChange={(event) => setNoteTitle(event.target.value)}
				/>
				<button className="btn btn-submit" type="submit">
					{editMode ? "Update Note" : "Add Note"}
				</button>
			</form>
			<ul className="note-list">
				{notes.map((note) => (
					<li key={note.id}>
						<span>{note.title}</span>
						<button className="btn btn-edit" onClick={() => editHandler(note)}>Edit</button>
						<button className="btn btn-remove" onClick={() => removeHandler(note.id)}>
							Remove
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;