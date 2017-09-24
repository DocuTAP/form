import 'style-loader!css-loader!mocha-css'

// create a div where mocha can add its stuff
const mochaDiv = document.createElement('DIV')
mochaDiv.id = 'mocha'
document.body.appendChild(mochaDiv)

const head = document.getElementsByTagName('head')[0];
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic';
head.appendChild(link);

const link2 = document.createElement('link');
link2.rel = 'stylesheet';
link2.href = '//fonts.googleapis.com/icon?family=Material+Icons';
head.appendChild(link2);

import 'mocha/mocha.js'
import sinon from 'sinon'
import chai from 'chai'
window.mocha.setup({
  ui: 'bdd',
  slow: 750,
  timeout: 5000,
  globals: [
    '__VUE_DEVTOOLS_INSTANCE_MAP__',
    'script',
    'inject',
    'originalOpenFunction'
  ]
})
window.sinon = sinon
chai.use(require('chai-dom'))
chai.use(require('sinon-chai'))
chai.should()

let vms = []
let testId = 0

beforeEach(function () {
  this.DOMElement = document.createElement('DIV')
  this.DOMElement.id = `test-${++testId}`
  document.body.appendChild(this.DOMElement)
})

afterEach(function () {
  const testReportElements = document.getElementsByClassName('test')
  const lastReportElement = testReportElements[testReportElements.length - 1]

  if (!lastReportElement) return
  const el = document.getElementById(this.DOMElement.id)
  if (el) lastReportElement.appendChild(el)
  // Save the vm to hide it later
  if (this.DOMElement.vm) vms.push(this.DOMElement.vm)
})

// Hide all tests at the end to prevent some weird bugs
before(function () {
  vms = []
  testId = 0
})
after(function () {
  requestAnimationFrame(function () {
    setTimeout(function () {
      vms.forEach(vm => {
        // Hide if test passed
        if (!vm.$el.parentElement.classList.contains('fail')) {
          vm.$children[0].visible = false
        }
      })
    }, 100)
  })
})

const specsContext = require.context('./specs', true)
specsContext.keys().forEach(specsContext)

window.mocha.checkLeaks()
window.mocha.run()
