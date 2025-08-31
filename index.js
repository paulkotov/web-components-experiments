const openClass = "is-open";
const flipClass = "flip";

// current card status
const cardStatus = {
  index: 0,
  active: null,
};

const cardInnerStyles = `
  <style>
    .shadow {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgb(146, 161, 176);
      opacity: 0.6;
      filter: blur(4px);
      transform: translate(1%, 1%) rotate(var(--rotate));
      transition: transform var(--transition), opacity var(--micro-transition) var(--transition);
    }
    .content {
      width: 100%;
      height: 100%;
    }
    .container {
      position: relative;
      width: 100%;
      height: 100%;
      background: #FFF;
      transform: rotate(var(--rotate));
      border-radius: 0.25rem;
      transition: transform var(--transition), box-shadow var(--micro-transition) var(--transition);
      transform-style: preserve-3d;
    }
    .front,
    .back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
    }
    .back {
      padding: var(--image-margin);
      transform: rotateY(180deg);
      font-family: 'Reenie Beanie', cursive;
      color: #545454;
      font-size: xx-large;
    }
    .image {
      margin: var(--image-margin);
      width: var(--image-size);
      height: var(--image-size);
      object-fit: cover;
      pointer-events: none;
    }
    .title {
      color: #323232;
      margin-top: -0.5rem;
      padding: 0 var(--image-margin);
      text-align: center;
      font-family: 'Gochi Hand', cursive;
      font-size: xx-large;
    }
  </style>
`;

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

  stopDrag = () => {
    this.inDrag = false;
    this.dragPrevX = this.dragEndX;
    this.dragPrevY = this.dragEndY;
  };

  open = () => {
    if (this.classList.contains('is-dragging')) {
      return;
    }
    this.closeActiveCard();
    cardStatus.active = cards.indexOf(this);
    this.setInFront();
    this.classList.add(openClass);
    setTimeout(() => {
      this.classList.add(flipClass)
    }, 1000);
  };

  close = () => {
    this.classList.remove(flipClass, openClass);
    this.setInFront();
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
      ${cardInnerStyles}
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