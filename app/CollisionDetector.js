export class Collidable {
  node = null
  callback = null
  killAfter

  constructor (node, collidedCallback, killAfter) {
    this.node = node
    this.callback = collidedCallback
    this.killAfter = killAfter
  }

  x () {
    return this.node.getBoundingClientRect().x
  }

  xW () {
    return this.node.getBoundingClientRect().x + this.node.getBoundingClientRect().width
  }

  y () {
    return this.node.getBoundingClientRect().y
  }

  yH () {
    return this.node.getBoundingClientRect().y + this.node.getBoundingClientRect().height
  }

  afterCollided (withCollidable) {
    this.callback(withCollidable)
  }

  collidesWith (collidable) {
    return (this.x() < collidable.xW() &&
      this.xW() > collidable.x() &&
      this.y() < collidable.yH() &&
      this.yH() > collidable.y())
  }
}

export class Engine {
  collidable
  constructor () {
    this.collidable = []
  }

  addCollidable (collidable) {
    this.collidable.push(collidable)
    return this
  }

  tick () {
    for (let i = 0; i < this.collidable.length; i++) {
      for (let i2 = 0; i2 < this.collidable.length; i2++){
        if (this.collidable[i] === this.collidable[i2]) {
          continue
        }
        if (this.collidable[i].collidesWith(this.collidable[i2])){
          this.collidable[i].afterCollided(this.collidable[i2])
        }
      }
    }
  }


}

export default {
  Collidable: Collidable,
  Engine: Engine
}
