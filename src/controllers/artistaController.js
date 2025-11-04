import ArtistaView from '../views/ArtistaView.js'
import { obtenerArtistaPorId } from '../models/artistaModel.js'

export default class ArtistaController {
  constructor(root, artistId = 1, isOwner = true) {
    this.view = new ArtistaView(root, isOwner)
    this.artist = null
    this.followed = false
    this.artistId = artistId
    this.isOwner = isOwner
    this.editMode = false
    this.visibilitySettings = null

    // Suscripciones a eventos de la vista
    this.view.on('followToggle', () => this.toggleFollow())
    this.view.on('moreInfoToggle', () => this.view.toggleMoreInfo())
    this.view.on('goCommunity', () => this.openCommunity())
    this.view.on('editProfile', () => this.toggleEditMode())
    this.view.on('saveProfile', (settings) => this.saveProfileSettings(settings))
    this.view.on('cancelEdit', () => this.toggleEditMode())

    // Inicializar
    this.init()
  }

  async init() {
    // Cargar artista según el ID recibido
    const a = await obtenerArtistaPorId(this.artistId)
    if (!a) return
    this.artist = a
    
    // Cargar configuración de visibilidad (localStorage)
    this.loadVisibilitySettings()
    
    // cargar estado local de seguimiento (localStorage por demo)
    try {
      const key = `follow_artist_${this.artist.id}`
      this.followed = localStorage.getItem(key) === '1'
    } catch (e) {
      this.followed = false
    }

    this.view.render(this.artist, this.visibilitySettings)
    this.view.setFollowState(this.followed)
  }

  loadVisibilitySettings() {
    try {
      const key = `visibility_artist_${this.artistId}`
      const stored = localStorage.getItem(key)
      this.visibilitySettings = stored ? JSON.parse(stored) : {
        showPopulares: true,
        showCanciones: true,
        showAlbumes: true,
        showMerch: true,
        showMoreInfo: true
      }
    } catch (e) {
      this.visibilitySettings = {
        showPopulares: true,
        showCanciones: true,
        showAlbumes: true,
        showMerch: true,
        showMoreInfo: true
      }
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode
    this.view.setEditMode(this.editMode, this.visibilitySettings)
  }

  saveProfileSettings(settings) {
    this.visibilitySettings = settings
    try {
      const key = `visibility_artist_${this.artistId}`
      localStorage.setItem(key, JSON.stringify(settings))
    } catch (e) {
      console.error('Error guardando configuración:', e)
    }
    this.editMode = false
    this.view.setEditMode(false)
    this.view.render(this.artist, this.visibilitySettings)
  }

  toggleFollow() {
    this.followed = !this.followed
    try {
      const key = `follow_artist_${this.artist.id}`
      localStorage.setItem(key, this.followed ? '1' : '0')
    } catch (e) {}
    this.view.setFollowState(this.followed)
  }

  openCommunity() {
    if (!this.artist || !this.artist.comunidadUrl) return
    window.open(this.artist.comunidadUrl, '_blank', 'noopener')
  }
}
