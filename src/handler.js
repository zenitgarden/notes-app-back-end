const fetch = require('node-fetch');

globalThis.fetch = fetch;
const { nanoid } = require('nanoid');
const notes = require('./notes');
const noteTags = require('./tags');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = (request, h) => {
  const { title } = request.query;

  if (title) {
    const response = h.response({
      status: 'success',
      data: {
        notes: notes.filter((note) => note.title.toLowerCase().indexOf(title.toLowerCase()) > -1
        || note.body.toLowerCase().indexOf(title.toLowerCase()) > -1),
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'success',
    data: {
      notes,
    },
  });

  response.code(200);
  return response;
};

const getTagsHandler = () => ({
  status: 'success',
  data: {
    noteTags,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Get data gempa dari BMKG
const getGempaTerkini = async () => {
  const req = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json');
  if (!req.ok) return { status: 'error', message: 'internal server error' };
  const res = await req.json();
  return res;
};

const getAutoGempa = async () => {
  const req = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
  if (!req.ok) return { status: 'error', message: 'internal server error' };
  const res = await req.json();
  return res;
};

const getGempaDirasakan = async () => {
  const req = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json');
  if (!req.ok) return { status: 'error', message: 'internal server error' };
  const res = await req.json();
  return res;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
  getTagsHandler,
  getGempaTerkini,
  getGempaDirasakan,
  getAutoGempa,
};
