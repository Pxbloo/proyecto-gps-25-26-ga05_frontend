import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './styleSearch.css'

// MVC demo minimal: Model-View-Controller wiring
import ExampleModel from './models/ExampleModel.js'
import ExampleView from './views/ExampleView.js'
import ExampleController from './controllers/ExampleController.js'
import RegisterView from './views/RegisterView.js'
import RegisterController from './controllers/RegisterController.js'
import RegisterModel from './models/RegisterModel.js'
import LoginView from './views/LoginView.js'
import LoginController from './controllers/LoginController.js'

// Funcionalidad de búsqueda
import SearchModel from './models/SearchModel.js'
import SearchView from './views/SearchView.js'
import SearchController from './controllers/SearchController.js'

// Router simple
class Router {
  constructor() {
    this.routes = {
      '/': mountExample,
      '/login': mountLogin,
      '/register': mountRegister
    }
    this.init()
  }

  init() {
    // Manejar navegación inicial
    window.addEventListener('popstate', () => {
      this.route()
    })

    // Manejar clicks en links
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-link]')) {
        e.preventDefault()
        this.navigate(e.target.href)
      }
    })

    this.route()
  }

  navigate(path) {
    window.history.pushState(null, null, path)
    this.route()
  }

  route() {
    const path = window.location.pathname
    const handler = this.routes[path] || this.routes['/']
    handler()
  }
}

// Funciones de montaje
const mountExample = () => {
  const root = document.getElementById('app')
  if (!root) return
  
  root.innerHTML = ''
  const model = new ExampleModel()
  const view = new ExampleView(root)
  // eslint-disable-next-line no-unused-vars
  const controller = new ExampleController(model, view)
}

const mountRegister = () => {
  const root = document.getElementById('app')
  if (!root) return
  
  root.innerHTML = ''
  const model = new RegisterModel()
  const view = new RegisterView(root)
  // eslint-disable-next-line no-unused-vars
  const controller = new RegisterController(view, model)
}

const mountLogin = () => {
  const root = document.getElementById('app')
  if (!root) return
  
  root.innerHTML = ''
  const view = new LoginView(root)
  const controller = new LoginController(view)
  controller.on('goRegister', () => {
    router.navigate('/register')
  })
  controller.on('loggedIn', (result) => {
    router.navigate('/')
  })
}

// Inicializar router
const router = new Router()

// Configurar botones con navegación
const setupNavigation = () => {
  const btnRegister = document.getElementById('btn-register')
  const btnLogin = document.getElementById('btn-login')

  btnRegister?.addEventListener('click', (e) => {
    e.preventDefault()
    router.navigate('/register')
  })

  btnLogin?.addEventListener('click', (e) => {
    e.preventDefault()
    router.navigate('/login')
  })
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation()
})

// Inicializar búsqueda
const searchInput = document.querySelector('input[type="search"]')
const searchButton = document.querySelector('button[type="submit"]')

if (searchInput && searchButton) {
  const searchModel = new SearchModel()
  const searchView = new SearchView(searchInput, searchButton)
  // eslint-disable-next-line no-unused-vars
  const searchController = new SearchController(searchModel, searchView)
}
