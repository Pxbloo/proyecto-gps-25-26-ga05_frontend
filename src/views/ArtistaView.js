import EventEmitter from '../core/EventEmitter.js'

export default class ArtistaView extends EventEmitter {
  constructor(rootEl, isOwner = false) {
    super()
    this.root = rootEl
    this.isOwner = isOwner
    this.root.classList.add('artist-view')
    this._renderShell()
  }

  _renderShell() {
    const editButtonHtml = this.isOwner ? '<button id="editProfileBtn" class="btn btn-warning btn-sm"><i class="bi bi-pencil"></i> Editar perfil</button>' : ''
    
    this.root.innerHTML = `
      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <div class="row g-3 align-items-center">
            <div class="col-auto">
              <img id="artistAvatar" src="/public/default-profile.png" alt="Avatar" class="rounded-circle" style="width:120px;height:120px;object-fit:cover;">
            </div>
            <div class="col">
              <h2 id="artistName" class="h4 mb-1">Nombre del Artista</h2>
              <div class="d-flex gap-2 align-items-center mb-2">
                <span class="text-muted" id="monthlyListeners">0</span>
                <small class="text-muted">oyentes mensuales</small>
              </div>
              <div class="d-flex gap-2 mb-2">
                ${this.isOwner ? editButtonHtml : '<button id="followBtn" class="btn btn-success btn-sm">Seguir</button>'}
                <button id="communityBtn" class="btn btn-outline-secondary btn-sm">Comunidad</button>
              </div>
              <div id="artistSocials" class="d-flex gap-2 flex-wrap"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div id="editPanel" class="card shadow-sm mb-4" hidden>
        <div class="card-body">
          <h5 class="card-title"><i class="bi bi-gear"></i> Configurar visibilidad del perfil</h5>
          <p class="text-muted small">Selecciona qué secciones quieres mostrar en tu perfil público</p>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="checkPopulares" checked>
            <label class="form-check-label" for="checkPopulares">Mostrar sección Populares</label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="checkCanciones" checked>
            <label class="form-check-label" for="checkCanciones">Mostrar sección Canciones</label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="checkAlbumes" checked>
            <label class="form-check-label" for="checkAlbumes">Mostrar sección Álbumes</label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="checkMerch" checked>
            <label class="form-check-label" for="checkMerch">Mostrar sección Merchandising</label>
          </div>
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="checkMoreInfo" checked>
            <label class="form-check-label" for="checkMoreInfo">Mostrar sección Más información</label>
          </div>
          <div class="d-flex gap-2">
            <button id="saveProfileBtn" class="btn btn-primary"><i class="bi bi-check-lg"></i> Guardar cambios</button>
            <button id="cancelEditBtn" class="btn btn-secondary">Cancelar</button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mb-3" id="sectionPopulares">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Populares</h5>
              <div id="popularList" class="list-group list-group-flush"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="row row-cols-1">
        <div class="col mb-3" id="sectionCanciones">
          <h5>Canciones</h5>
          <div id="songsCarousel" class="d-flex overflow-auto gap-3 py-2"></div>
        </div>
        <div class="col mb-3" id="sectionAlbumes">
          <h5>Álbumes</h5>
          <div id="albumsCarousel" class="d-flex overflow-auto gap-3 py-2"></div>
        </div>
        <div class="col mb-3" id="sectionMerch">
          <h5>Merchandising</h5>
          <div id="merchCarousel" class="d-flex overflow-auto gap-3 py-2"></div>
        </div>
      </div>

      <div class="card mt-3" id="sectionMoreInfo">
        <div class="card-body">
          <button id="toggleMoreInfo" class="btn btn-link p-0">Más información</button>
          <div id="moreInfo" class="mt-3" hidden>
            <h6>Sobre el artista</h6>
            <p id="artistBio" class="text-muted">Biografía...</p>
            <ul class="list-unstyled small text-muted">
              <li><strong>Género:</strong> <span id="artistGenre">—</span></li>
              <li><strong>País:</strong> <span id="artistCountry">—</span></li>
              <li><strong>Año de inicio:</strong> <span id="artistStarted">—</span></li>
            </ul>
          </div>
        </div>
      </div>
    `

    // Referencias a elementos
    this.$avatar = this.root.querySelector('#artistAvatar')
    this.$name = this.root.querySelector('#artistName')
    this.$listeners = this.root.querySelector('#monthlyListeners')
    this.$follow = this.root.querySelector('#followBtn')
    this.$editProfile = this.root.querySelector('#editProfileBtn')
    this.$community = this.root.querySelector('#communityBtn')
    this.$socials = this.root.querySelector('#artistSocials')
    this.$popular = this.root.querySelector('#popularList')
    this.$songs = this.root.querySelector('#songsCarousel')
    this.$albums = this.root.querySelector('#albumsCarousel')
    this.$merch = this.root.querySelector('#merchCarousel')
    this.$toggleMore = this.root.querySelector('#toggleMoreInfo')
    this.$more = this.root.querySelector('#moreInfo')
    this.$bio = this.root.querySelector('#artistBio')
    this.$genre = this.root.querySelector('#artistGenre')
    this.$country = this.root.querySelector('#artistCountry')
    this.$started = this.root.querySelector('#artistStarted')
    
    // Panel de edición
    this.$editPanel = this.root.querySelector('#editPanel')
    this.$checkPopulares = this.root.querySelector('#checkPopulares')
    this.$checkCanciones = this.root.querySelector('#checkCanciones')
    this.$checkAlbumes = this.root.querySelector('#checkAlbumes')
    this.$checkMerch = this.root.querySelector('#checkMerch')
    this.$checkMoreInfo = this.root.querySelector('#checkMoreInfo')
    this.$saveProfile = this.root.querySelector('#saveProfileBtn')
    this.$cancelEdit = this.root.querySelector('#cancelEditBtn')
    
    // Secciones
    this.$sectionPopulares = this.root.querySelector('#sectionPopulares')
    this.$sectionCanciones = this.root.querySelector('#sectionCanciones')
    this.$sectionAlbumes = this.root.querySelector('#sectionAlbumes')
    this.$sectionMerch = this.root.querySelector('#sectionMerch')
    this.$sectionMoreInfo = this.root.querySelector('#sectionMoreInfo')

    // Listeners
    if (this.$follow) {
      this.$follow.addEventListener('click', () => this.emit('followToggle'))
    }
    if (this.$editProfile) {
      this.$editProfile.addEventListener('click', () => this.emit('editProfile'))
    }
    this.$toggleMore.addEventListener('click', () => this.emit('moreInfoToggle'))
    this.$community.addEventListener('click', () => this.emit('goCommunity'))
    
    if (this.$saveProfile) {
      this.$saveProfile.addEventListener('click', () => {
        const settings = {
          showPopulares: this.$checkPopulares.checked,
          showCanciones: this.$checkCanciones.checked,
          showAlbumes: this.$checkAlbumes.checked,
          showMerch: this.$checkMerch.checked,
          showMoreInfo: this.$checkMoreInfo.checked
        }
        this.emit('saveProfile', settings)
      })
    }
    
    if (this.$cancelEdit) {
      this.$cancelEdit.addEventListener('click', () => this.emit('cancelEdit'))
    }
  }

  render(artist, visibilitySettings = {}) {
    if (!artist) return
    
    // Valores por defecto
    const visibility = {
      showPopulares: true,
      showCanciones: true,
      showAlbumes: true,
      showMerch: true,
      showMoreInfo: true,
      ...visibilitySettings
    }
    
    this.$avatar.src = artist.imagen || '/public/default-profile.png'
    this.$name.textContent = artist.nombre || '—'
    this.$listeners.textContent = (artist.oyentesMensuales || 0).toLocaleString()
    this.$bio.textContent = artist.bio || ''
    this.$genre.textContent = artist.genre || '—'
    this.$country.textContent = artist.country || '—'
    this.$started.textContent = artist.started || '—'
    
    // Aplicar visibilidad
    this.$sectionPopulares.hidden = !visibility.showPopulares
    this.$sectionCanciones.hidden = !visibility.showCanciones
    this.$sectionAlbumes.hidden = !visibility.showAlbumes
    this.$sectionMerch.hidden = !visibility.showMerch
    this.$sectionMoreInfo.hidden = !visibility.showMoreInfo

    // Socials with icons (Bootstrap Icons + custom SVG)
    this.$socials.innerHTML = ''
    const ICON_MAP = {
      instagram: 'bi-instagram',
      spotify: 'bi-spotify',
      twitter: 'bi-twitter',
      facebook: 'bi-facebook',
      youtube: 'bi-youtube',
      tiktok: 'tiktok-svg'
    }
    
    const TIKTOK_SVG = '<svg width="16" height="16" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path></svg>'
    
    if (artist.enlaces) {
      for (const [key, url] of Object.entries(artist.enlaces)) {
        const a = document.createElement('a')
        a.href = url
        a.target = '_blank'
        a.rel = 'noreferrer'
        a.className = 'btn btn-outline-secondary btn-sm d-inline-flex align-items-center'
        a.style.minWidth = 'unset'
        const iconClass = ICON_MAP[key.toLowerCase()] || 'bi-link-45deg'
        
        // Icon + hidden text for screen readers
        if (key.toLowerCase() === 'tiktok') {
          a.innerHTML = `${TIKTOK_SVG}<span class="visually-hidden">${key}</span>`
        } else {
          a.innerHTML = `<i class="bi ${iconClass}" aria-hidden="true"></i><span class="visually-hidden">${key}</span>`
        }
        a.title = key
        this.$socials.appendChild(a)
      }
    }

    // Populares
    this.$popular.innerHTML = ''
    if (artist.populares && artist.populares.length) {
      artist.populares.forEach(p => {
        const div = document.createElement('div')
        div.className = 'list-group-item d-flex gap-3 align-items-center'
        div.innerHTML = `
          <img src="${p.portada || '/public/default-profile.png'}" alt="" style="width:56px;height:56px;object-fit:cover;border-radius:6px">
          <div>
            <div class="fw-bold">${p.titulo}</div>
            <div class="text-muted small">${p.tipo}${p.anio ? ' · ' + p.anio : ''}</div>
          </div>
        `
        this.$popular.appendChild(div)
      })
    } else {
      const li = document.createElement('div')
      li.className = 'list-group-item text-muted'
      li.textContent = 'Sin elementos populares'
      this.$popular.appendChild(li)
    }

    // Helper para renderizar tarjetas en carrusel
    const renderCards = (container, items, type) => {
      container.innerHTML = ''
      if (!items || items.length === 0) {
        const empty = document.createElement('div')
        empty.className = 'text-muted'
        empty.textContent = 'Sin elementos'
        container.appendChild(empty)
        return
      }
      items.forEach(item => {
        const card = document.createElement('div')
        card.className = 'card'
        card.style.minWidth = '180px'
        card.innerHTML = `
          <img src="${item.portada || item.imagen || '/public/default-profile.png'}" class="card-img-top" style="height:120px;object-fit:cover" alt="">
          <div class="card-body p-2">
            <div class="card-title small fw-bold">${item.titulo || item.nombre || item.nombre}</div>
            <div class="card-text small text-muted">${item.anio || item.precio || item.duracion || ''}</div>
          </div>
        `
        container.appendChild(card)
      })
    }

    renderCards(this.$songs, artist.canciones, 'cancion')
    renderCards(this.$albums, artist.albumes, 'album')
    renderCards(this.$merch, artist.productos, 'producto')
  }

  setFollowState(followed) {
    this.$follow.textContent = followed ? 'Siguiendo' : 'Seguir'
    this.$follow.classList.toggle('btn-outline-success', followed)
    this.$follow.classList.toggle('btn-success', !followed)
  }

  toggleMoreInfo(show) {
    if (typeof show === 'boolean') {
      this.$more.hidden = !show
      return
    }
    this.$more.hidden = !this.$more.hidden
  }

  setEditMode(editMode, visibilitySettings = null) {
    if (!this.$editPanel) return
    
    this.$editPanel.hidden = !editMode
    
    if (editMode && visibilitySettings) {
      // Sincronizar checkboxes con configuración actual
      this.$checkPopulares.checked = visibilitySettings.showPopulares
      this.$checkCanciones.checked = visibilitySettings.showCanciones
      this.$checkAlbumes.checked = visibilitySettings.showAlbumes
      this.$checkMerch.checked = visibilitySettings.showMerch
      this.$checkMoreInfo.checked = visibilitySettings.showMoreInfo
    }
  }
}
