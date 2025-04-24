class CardElement extends HTMLElement {
  dragStartX = 0
  dragStartY = 0
  dragEndX = 0
  dragEndY = 0
  dragPrevX = 0
  dragPrevY = 0
  objInitLeft = 0
  objInitTop = 0
  inDrag = false

  rotate = 0
  zIndex = 0

  constructor(title, description, image) {
    super();
    this.title = title
    this.description = description
    this.image = image
  }

  // add event listeners
  connectedCallback() {
    this.render()
    this.randomCoordinate()
    this.addEventListener('mousedown', this)
    this.addEventListener('mousemove', this)
    this.addEventListener('mouseup', this)
    this.addEventListener('mouseleave', this)
    this.addEventListener('wheel', this)
  }

  // remove event listeners 
  disconnectedCallback() {
    this.removeEventListener('mousedown', this)
    this.removeEventListener('mousemove', this)
    this.removeEventListener('mouseup', this)
    this.removeEventListener('wheel', this)
    this.removeEventListener('mouseleave', this)
  }

  // handling events
  handleEvent = (event) => {
    switch (event.type) {
      case 'mousedown':
        this.dragStart(event)
        break
      case 'mousemove':
        this.dragMove(event)
        break
      case 'mouseup':
        this.dragEnd(event)
        break
      case 'mouseleave':
        this.dragEnd(event)
        break
      case 'wheel':
        this.handleWheel(event)
        break
    }
  }
  handleEvent = (event) => {}

  // setting position
  setPosition = (x, y, z) => {
    const styles = `
      --left    : ${x}px;
      --top     : ${y}px;
      --rotate  : ${z}deg;
      --z-index : ${this.zIndex};
    `
    this.setAttribute('style', styles)
  }

  render() {
    this.classList.add('photo')
    this.innerHTML = `
      <div class="shadow"></div>
      <div class="content">
        <div class="container">
          <div class="front">
            <img class="image" src=${this.image}/>
            <p class="title">${this.title}</p>
          </div>
          <div class="back">
            <p>${this.description}</p>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('card-element', CardElement)