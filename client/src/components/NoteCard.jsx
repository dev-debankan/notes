import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const NoteCard = ({ note, onEdit, onDelete }) => {
    return (
        <div className="note-card" style={{ borderLeft: `4px solid ${note.color}` }}>
            <div className="note-header">
                <div className="note-title">{note.title}</div>
            </div>
            <div className="note-content">
                {note.content}
            </div>
            <div className="note-footer">
                <button className="icon-btn" onClick={() => onEdit(note)} title="Edit">
                    <FaEdit />
                </button>
                <button className="icon-btn delete" onClick={() => onDelete(note._id)} title="Delete">
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default NoteCard;
