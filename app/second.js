import {Collidable, Engine} from './CollisionDetector.js'

import './index.scss'

let E = new Engine()


document.addEventListener('DOMContentLoaded', () => {
  console.log('ready')

  let car = new Collidable(document.querySelector('#car'), function (collidesWith) {
  }, false)
  let carXOffset = car.node.getBoundingClientRect().left
  let parking = new Collidable(document.querySelector('#parking'), function (collidesWith) {
    this.node.classList.add('taken')
  }, false)

  let wall = new Collidable(document.querySelector('#wall'), function (collidesWith) {
    if (collidesWith === car) {
      car.node.classList.remove('moving')
      car.node.style.left = (carXOffset - 8) + "px"
      car.node.style.bottom = wall.node.getBoundingClientRect().top + pageYOffset + "px"
      parking.node.classList.add('taken')
    }
  }, false)

  E.addCollidable(car)
      .addCollidable(parking)
      .addCollidable(wall)


  let lastScrollTop = 0

  window.addEventListener('scroll', () => {
    E.tick()

    if ((wall.node.getBoundingClientRect().top + pageYOffset) > (pageYOffset + (window.innerHeight / 2)) ) {
      car.node.classList.add('moving')
    }

    let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop){
      // downscroll code
    } else {
      // upscroll code
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

  }, {passive: true})

})
