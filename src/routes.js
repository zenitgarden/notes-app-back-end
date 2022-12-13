const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
  getTagsHandler,
  getGempaTerkini,
  getAutoGempa,
  getGempaDirasakan,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/{notes?}',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
  {
    method: 'GET',
    path: '/tags',
    handler: getTagsHandler,
  },
  {
    method: 'GET',
    path: '/gempaterkini',
    handler: getGempaTerkini,
  },
  {
    method: 'GET',
    path: '/autogempa',
    handler: getAutoGempa,
  },
  {
    method: 'GET',
    path: '/gempadirasakan',
    handler: getGempaDirasakan,
  },
];

module.exports = routes;
