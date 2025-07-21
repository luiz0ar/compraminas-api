/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import app from '@adonisjs/core/services/app'

router.post('/login', '#controllers/users_controller.login')
router.resource('users', () => import('#controllers/users_controller'))

// Rotas GET para buscar conteúdo publicamente
router.get('/footer', '#controllers/footers_controller.index')
router.get('/footer/:key', '#controllers/footers_controller.show')
router.get('/about-section', '#controllers/about_sections_controller.show')
router.get('/about-page', '#controllers/about_pages_controller.show')
router.get('/start', '#controllers/starts_controller.show')
router.get('/exhibitors', '#controllers/exhibitors_controller.index')
router.get('/press-content', '#controllers/press_articles_controller.show')
router.get('/contact', '#controllers/contacts_controller.show')
router.get('/contact-settings', '#controllers/contact_settings_controller.index')
router.get('/unities', '#controllers/unities_controller.index')


// --- ROTAS PROTEGIDAS (Escrita, Edição, Deleção) ---
router.group(() => {
  // Rotas PUT para atualização de conteúdo
  router.put('/start', '#controllers/starts_controller.update')
  router.put('/about-section', '#controllers/about_sections_controller.update')
  router.put('/about-page', '#controllers/about_pages_controller.update')
  router.put('/footer', '#controllers/footers_controller.update')
  router.put('/press-content', '#controllers/press_articles_controller.update')
  router.put('/contact', '#controllers/contacts_controller.update')
  router.put('/contact-settings', '#controllers/contact_settings_controller.update')

  // Rota do formulário de contato
  router.post('/send-contact-email', '#controllers/contact_forms_controller.send')

  // --- ROTAS DE UPLOAD ---
  router.post('/press-content/upload', '#controllers/press_articles_controller.uploadImage')
  // ROTA DE UPLOAD ADICIONADA E CORRIGIDA
  router.post('/exhibitors/upload', '#controllers/exhibitors_controller.upload')

  // --- GERENCIAMENTO DE RECURSOS (CRUD) ---
  router.resource('exhibitors', '#controllers/exhibitors_controller').except(['index']) // .index() é público
  router.resource('unities', '#controllers/unities_controller').except(['index'])      // .index() é público

}).use(middleware.auth()) // Aplica o middleware de autenticação a todo o grupo


// --- ROTA PARA SERVIR ARQUIVOS ---
router.get('/uploads/*', ({ response, request }) => {
  const filePath = request.param('*').join('/')
  return response.download(app.makePath('uploads', filePath))
})
