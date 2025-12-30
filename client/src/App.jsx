import React, { useState, useEffect } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from './api';
import NoteCard from './components/NoteCard';
import { FaPlus, FaTimes } from 'react-icons/fa';

function App() {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', color: '#bb86fc' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data } = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateNote(editingId, formData);
      } else {
        await createNote(formData);
      }
      setFormData({ title: '', content: '', color: '#bb86fc' });
      setEditingId(null);
      setShowForm(false);
      fetchNotes();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleEdit = (note) => {
    setFormData({ title: note.title, content: note.content, color: note.color });
    setEditingId(note._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this note?")) {
      await deleteNote(id);
      fetchNotes();
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setFormData({ title: '', content: '', color: '#bb86fc' });
      setEditingId(null);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">Notes.</div>
        <button onClick={toggleForm}>
          {showForm ? <><FaTimes /> Close</> : <><FaPlus /> Add Note</>}
        </button>
      </header>

      {showForm && (
        <div className="form-container">
          <h2>{editingId ? 'Edit Note' : 'New Note'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <textarea
              rows="5"
              placeholder="Write your thoughts..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            ></textarea>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
              <label>Accent Color:</label>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                style={{ width: '50px', padding: 0, height: '40px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit">{editingId ? 'Update' : 'Create'}</button>
              <button type="button" style={{ background: 'transparent', color: 'var(--text-main)', border: '1px solid #444' }} onClick={toggleForm}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="note-grid">
        {notes.length === 0 ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#666' }}>No notes yet. Create one!</p>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
