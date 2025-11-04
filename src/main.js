import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './style.css'

// Router y controladores
import Router from './core/Router.js'
import ExampleModel from './models/ExampleModel.js'
import ExampleView from './views/ExampleView.js'
import ExampleController from './controllers/ExampleController.js'
import ArtistaController from './controllers/artistaController.js'

// Configurar router
const router = new Router()
const root = document.getElementById('app')

if (root) {
	router.setRoot(root)

	// Ruta: Home (ejemplo)
	router.addRoute('/', () => {
		const model = new ExampleModel()
		const view = new ExampleView(root)
		return new ExampleController(model, view)
	})

	// Ruta: Perfil de artista (visitante)
	router.addRoute('/artista/:id', (params) => {
		const artistId = parseInt(params.id, 10)
		return new ArtistaController(root, artistId, false)
	})
	
	// Ruta: Perfil de artista (owner - modo edición)
	router.addRoute('/artista/:id/owner', (params) => {
		const artistId = parseInt(params.id, 10)
		return new ArtistaController(root, artistId, true)
	})

	// Iniciar router
	router.init()
}
