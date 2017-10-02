import DocutapSubmit from './components/docutap-submit'
import DocutapForm from './components/docutap-form'
import DocutapInfo from './components//docutap-info'

const options = {
  DocutapSubmit,
  DocutapForm,
  DocutapInfo
}

options.install = (Vue) => {
  for (const component in options) {
    const componentInstaller = options[component]

    if (componentInstaller && component !== 'install') {
      Vue.use(componentInstaller)
    }
  }
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(options.install)
}

options.version = '__VERSION__'

export default options
