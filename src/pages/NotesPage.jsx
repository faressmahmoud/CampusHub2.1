import { useState, useEffect } from 'react';
import { getCurrentUser, getUserData, saveUserData } from '../utils/auth';

/**
 * NotesPage component - manage notes and links
 */
const NotesPage = () => {
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' or 'links'
  const [notes, setNotes] = useState([]);
  const [links, setLinks] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [editingLink, setEditingLink] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Form states
  const [noteForm, setNoteForm] = useState({ title: '', content: '' });
  const [linkForm, setLinkForm] = useState({ title: '', url: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      // Load user-specific data
      const userNotes = getUserData('notes', user.email);
      const userLinks = getUserData('links', user.email);
      setNotes(userNotes);
      setLinks(userLinks);
    }
  }, []);

  // Save notes to localStorage
  const saveNotes = (newNotes) => {
    if (currentUser) {
      saveUserData('notes', currentUser.email, newNotes);
      setNotes(newNotes);
    }
  };

  // Save links to localStorage
  const saveLinks = (newLinks) => {
    if (currentUser) {
      saveUserData('links', currentUser.email, newLinks);
      setLinks(newLinks);
    }
  };

  // Validate URL
  const validateURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Handle note submission
  const handleNoteSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!noteForm.title.trim()) {
      setError('Note title is required');
      return;
    }

    if (editingNote) {
      // Update existing note
      const updatedNotes = notes.map(note =>
        note.id === editingNote.id
          ? { ...note, ...noteForm, updatedAt: new Date().toISOString() }
          : note
      );
      saveNotes(updatedNotes);
      setEditingNote(null);
    } else {
      // Add new note
      const newNote = {
        id: Date.now().toString(),
        ...noteForm,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      saveNotes([...notes, newNote]);
    }

    setNoteForm({ title: '', content: '' });
  };

  // Handle link submission
  const handleLinkSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!linkForm.title.trim()) {
      setError('Link title is required');
      return;
    }

    if (!linkForm.url.trim()) {
      setError('URL is required');
      return;
    }

    // Validate URL format
    let url = linkForm.url.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    if (!validateURL(url)) {
      setError('Please enter a valid URL');
      return;
    }

    if (editingLink) {
      // Update existing link
      const updatedLinks = links.map(link =>
        link.id === editingLink.id
          ? { ...link, title: linkForm.title, url, updatedAt: new Date().toISOString() }
          : link
      );
      saveLinks(updatedLinks);
      setEditingLink(null);
    } else {
      // Add new link
      const newLink = {
        id: Date.now().toString(),
        title: linkForm.title,
        url,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      saveLinks([...links, newLink]);
    }

    setLinkForm({ title: '', url: '' });
  };

  // Handle note delete
  const handleNoteDelete = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      const updatedNotes = notes.filter(note => note.id !== noteId);
      saveNotes(updatedNotes);
      if (editingNote && editingNote.id === noteId) {
        setEditingNote(null);
        setNoteForm({ title: '', content: '' });
      }
    }
  };

  // Handle link delete
  const handleLinkDelete = (linkId) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      const updatedLinks = links.filter(link => link.id !== linkId);
      saveLinks(updatedLinks);
      if (editingLink && editingLink.id === linkId) {
        setEditingLink(null);
        setLinkForm({ title: '', url: '' });
      }
    }
  };

  // Handle note edit
  const handleNoteEdit = (note) => {
    setEditingNote(note);
    setNoteForm({ title: note.title, content: note.content });
    setActiveTab('notes');
  };

  // Handle link edit
  const handleLinkEdit = (link) => {
    setEditingLink(link);
    setLinkForm({ title: link.title, url: link.url });
    setActiveTab('links');
  };

  // Cancel edit
  const handleCancelEdit = () => {
    if (activeTab === 'notes') {
      setEditingNote(null);
      setNoteForm({ title: '', content: '' });
    } else {
      setEditingLink(null);
      setLinkForm({ title: '', url: '' });
    }
    setError('');
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => {
              setActiveTab('notes');
              handleCancelEdit();
            }}
            className={`px-4 py-2 font-medium transition ${
              activeTab === 'notes'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Notes ({notes.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('links');
              handleCancelEdit();
            }}
            className={`px-4 py-2 font-medium transition ${
              activeTab === 'links'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Links ({links.length})
          </button>
        </div>
      </div>

      {/* Notes Tab */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          {/* Note Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {editingNote ? 'Edit Note' : 'Add New Note'}
            </h2>
            <form onSubmit={handleNoteSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="noteTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="noteTitle"
                  value={noteForm.title}
                  onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Note title"
                />
              </div>
              <div>
                <label htmlFor="noteContent" className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  id="noteContent"
                  value={noteForm.content}
                  onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Write your note here..."
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  {editingNote ? 'Update Note' : 'Add Note'}
                </button>
                {editingNote && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Notes List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Notes</h2>
            {notes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.map((note) => (
                  <div key={note.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleNoteEdit(note)}
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleNoteDelete(note.id)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm whitespace-pre-wrap">{note.content || 'No content'}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No notes yet. Add your first note above!</p>
            )}
          </div>
        </div>
      )}

      {/* Links Tab */}
      {activeTab === 'links' && (
        <div className="space-y-6">
          {/* Link Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {editingLink ? 'Edit Link' : 'Add New Link'}
            </h2>
            <form onSubmit={handleLinkSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="linkTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="linkTitle"
                  value={linkForm.title}
                  onChange={(e) => setLinkForm({ ...linkForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Link title"
                />
              </div>
              <div>
                <label htmlFor="linkUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="linkUrl"
                  value={linkForm.url}
                  onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="https://example.com"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  {editingLink ? 'Update Link' : 'Add Link'}
                </button>
                {editingLink && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Links List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Links</h2>
            {links.length > 0 ? (
              <div className="space-y-3">
                {links.map((link) => (
                  <div key={link.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{link.title}</h3>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm break-all"
                        >
                          {link.url}
                        </a>
                        <p className="text-xs text-gray-400 mt-1">
                          Added: {new Date(link.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleLinkEdit(link)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleLinkDelete(link.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No links yet. Add your first link above!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;

