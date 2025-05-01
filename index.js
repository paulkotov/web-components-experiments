const openClass = "is-open";
const flipClass = "flip";

// current card status
const cardStatus = {
  index: 0,
  active: null,
};

class CardElement extends HTMLElement {
  dragStartX = 0;
  dragStartY = 0;
  dragEndX = 0;
  dragEndY = 0;
  dragPrevX = 0;
  dragPrevY = 0;
  objInitLeft = 0;
  objInitTop = 0;
  inDragging = false;

  rotate = 0
  zIndex = 0

  constructor(title, description, image) {
    super();
    this.title = title;
    this.description = description;
    this.image = image;
  }

  // add event listeners
  connectedCallback() {
    this.render();
    this.setRandomCoordinate();
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
        this.startDrag(event);
        break;
      case 'mousemove':
        this.moveDrag(event);
        break
      case 'mouseup':
        if (
          this.dragPrevX === this.dragEndX &&
          this.dragPrevY === this.dragEndY
        ) {
          if (this.classList.contains(openClass)) {
            cardStatus.active = null;
            this.close();
          } else {
            this.open();
          }
        }
        this.stopDrag();
        break;
      case 'mouseleave':
        this.stopDrag();
        break;
      case 'wheel':
        // handle wheel event
        break;
    }
  }

  // setting position
  setPosition = (x, y, z) => {
    const styles = `
      --left    : ${x}px;
      --top     : ${y}px;
      --rotate  : ${z}deg;
      --z-index : ${this.zIndex};
    `
    this.setAttribute('style', styles);
  };

  startDrag = (e) => {
    this.inDrag = true;
    this.dragStartX = e.pageX
    this.dragStartY = e.pageY
    this.setToFront();
  };

  setToFront = () => {
    // if card is already on top
    if (this.zIndex >= cardStatus.index && this.zIndex !== 0) {
      return null;
    }
    // need to set to top
  };

  setRandomCoordinate = () => {
    // set random position
  };

  // render card markdown
  render = () => {
    this.classList.add('photo');
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
    `;
  };
}

customElements.define('card-element', CardElement)