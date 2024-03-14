import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './MarkdownEditor.css';

const MarkdownEditor = () => {
    const [markdownContent, setMarkdownContent] = useState('');
    const [noteTitle, setNoteTitle] = useState('');
    const [previewMode, setPreviewMode] = useState(false);
    const [savedNotes, setSavedNotes] = useState([]);
    const [showNoteSystem, setShowNoteSystem] = useState(false);

    const handleEditorChange = (event) => {
        setMarkdownContent(event.target.value);
    };


    const handleTitleChange = (event) => {
        setNoteTitle(event.target.value);
    };


    const togglePreview = () => {
        setPreviewMode(!previewMode);
    };

    const saveToLocalStorage = () => {
        const newNote = {
            title: noteTitle,
            content: markdownContent
        };
        const updatedNotes = [...savedNotes, newNote];
        setSavedNotes(updatedNotes);
        localStorage.setItem('savedNotes', JSON.stringify(updatedNotes));
    };

    const deleteNote = (index) => {
        const updatedNotes = [...savedNotes];
        updatedNotes.splice(index, 1);
        setSavedNotes(updatedNotes);
        localStorage.setItem('savedNotes', JSON.stringify(updatedNotes));
    };

    const loadFromLocalStorage = () => {
        const savedNotesData = localStorage.getItem('savedNotes');
        if (savedNotesData) {
            setSavedNotes(JSON.parse(savedNotesData));
        }
    };


    useEffect(() => {
        loadFromLocalStorage();
    }, []);


    const handleSaveNote = () => {
        saveToLocalStorage();
    };

    const handleCreateNote = () => {
        if (!showNoteSystem) {
            setShowNoteSystem(true);
        }
    };

    return (
        <div className="markdown-editor-container">
            {!showNoteSystem && (
                <div className='abc'>
                    <h2>You have no notes</h2>
                    <button onClick={handleCreateNote}>Create one now</button>
                </div>
            )}
            {showNoteSystem && (
                <div>
                    <div>
                        <input
                            type="text"
                            value={noteTitle}
                            onChange={handleTitleChange}
                            className="input-title"
                            placeholder="Enter note title..."
                        />
                        <button onClick={handleSaveNote} className="button-save">Save Note</button>
                    </div>
                    <div>
                        <textarea
                            value={markdownContent}
                            onChange={handleEditorChange}
                            className="textarea-content"
                            rows={10}
                            cols={50}
                            placeholder="Enter Markdown content here..."
                        />
                    </div>
                    <div>
                        <button onClick={togglePreview} className="button-preview">Preview</button>
                        {previewMode && (
                            <div>
                                <h2>Preview</h2>
                                <ReactMarkdown>{markdownContent}</ReactMarkdown>
                            </div>
                        )}
                    </div>
                    <div>
                        {savedNotes.map((note, index) => (
                            <div key={index} className="note-container">
                                <h3 className="note-title">{note.title}</h3>
                                <button onClick={() => deleteNote(index)} className="delete-button">Delete</button>
                                <div>
                                    <ReactMarkdown>{note.content}</ReactMarkdown>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarkdownEditor;
