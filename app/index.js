import { PrimaLazyLoad, onPrimaLazyLoadFinished, onPrimaLazyLoadReady } from './PrimaLazyLoad.js'
import PrimaLL from './PrimaLazyLoad.js'

console.log('Boilerplate is working!')

onPrimaLazyLoadFinished(LazyLoadInstance => {
  console.log('Instance', LazyLoadInstance.whoAmI())
})

onPrimaLazyLoadReady(LazyLoadInstance => {
  console.log('global', new PrimaLL())
})


document.addEventListener('DOMContentLoaded', () => {
  const a = new PrimaLazyLoad({
    elements_selector: ".lazy"
  })

  let b

  setTimeout(() => {
    b = new PrimaLazyLoad({
      elements_selector: ".lazy-me"
    })
  }, 1000)

  setTimeout(() => {
    console.log('a:', a.whoAmI())
    console.log('b:', b.whoAmI())
  },3000)

}, false)
