const { render } = wp.element
import { Hall } from './components/hall'

function onload() {
  render(<Hall />, document.getElementById(`wp_theme_kuworking`))
}

window.addEventListener
  ? window.addEventListener('load', onload, false)
  : window.attachEvent && window.attachEvent('onload', onload)

// define global variable to move data from
window.wp_theme_kuworking = {}
