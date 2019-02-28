import LazyLoad from 'vanilla-lazyload'

global.PrimaLazyLoadSingleton = null

export function getPrimaSingleton() { return global.PrimaLazyLoadSingleton }
function setPrimaSingleton(prima) { global.PrimaLazyLoadSingleton = prima}

export function onPrimaLazyLoadFinished(callback) {
  if (getPrimaSingleton() && getPrimaSingleton().finished) {
    console.log('immediate callback call')
    callback(getPrimaSingleton())
  }

  console.log('register callback to event')
  document.addEventListener(PrimaLazyLoad.event, () => {
    callback(getPrimaSingleton())
  }, false)
}

export function onPrimaLazyLoadReady(callback) {
  if (getPrimaSingleton() && getPrimaSingleton().finished) {
    console.log('immediate callback call')
    callback(getPrimaSingleton())
  }

  console.log('register callback to event')
  document.addEventListener(PrimaLazyLoad.ready, () => {
    callback(getPrimaSingleton())
  }, false)
}

export class PrimaLazyLoad {
  lazyLoad
  finished = false
  ready = false
  hash = null

  static event = 'prima-lazyLoad-finished'
  static ready = 'prima.lazyload-ready'

  constructor(arg) {
    if (!getPrimaSingleton()) {
      this.lazyLoad = new LazyLoad(Object.assign(arg, {callback_finish: this.finishCallback}))
      setPrimaSingleton(this)
      this.hash = new Date().getUTCMilliseconds()
      this.ready = true
      document.dispatchEvent(new Event(PrimaLazyLoad.ready))
    } else {
      console.error('You\'re trying to create a second instance of webp this is should be used as singleton service')
      return getPrimaSingleton()
    }
  }

  whoAmI() {
    return this.hash
  }

  finishCallback = () => {
    console.log('finish callback ')
    this.finished = true
    document.dispatchEvent(new Event(PrimaLazyLoad.event))
  }
}

export default {
  PrimaLazyLoad: PrimaLazyLoad,
  getSingleton: getPrimaSingleton
}
