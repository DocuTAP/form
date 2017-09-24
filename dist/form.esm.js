/*!
 * @docutap/form v0.0.0
 * (c) 2017 adriancarriger
 * Released under the MIT License.
 */

var DocutapSubmit = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('md-button',{staticClass:"md-raised md-accent",class:_vm.schema.classes,attrs:{"type":"submit"}},[_vm._v(_vm._s(_vm.schema.text || 'Submit'))])},staticRenderFns: [],
  name: 'docutap-submit',
  props: {
    schema: {
      type: Object
    }
  }
};

function install (Vue) {
  Vue.component('docutap-submit', DocutapSubmit);
}

var DocutapForm = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{attrs:{"novalidate":""},on:{"submit":function($event){$event.preventDefault();_vm.validateBeforeSubmit($event);}}},_vm._l((_vm.schemaItems),function(item){return _c(item.component,{key:item.name,tag:"component",attrs:{"schema":item,"model":_vm.model,"showErrors":_vm.showErrors}})}))},staticRenderFns: [],
  name: 'docutap-form',
  $validates: true,
  props: {
    model: {
      type: Object
    },
    schema: {
      type: Object
    }
  },
  data: function data () {
    return {
      schemaItems: [],
      showErrors: false
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.schemaItems = this.schema.fields
      .map(function (item) {
        // Set name
        if (item.name === undefined) { item.name = this$1.camelize(item.label); }
        // Get component from type
        if (item.component === undefined) {
          if (['select', 'radio', 'checkboxes'].includes(item.type)) {
            item.component = "docutap-" + (item.type);
          } else if (item.type === 'submit') {
            item.component = 'docutap-submit';
            item.input = false;
            item.validator = false;
          } else {
            item.component = 'docutap-input';
          }
        }
        // Set default validator
        if (item.validator === undefined) { item.validator = ''; }
        // Set default type if input
        if (item.component === 'docutap-input' && item.type === undefined) { item.type = 'text'; }
        // Create
        if (item.input !== false && this$1.model[item.name] === undefined) {
          if (item.type === 'checkboxes') {
            this$1.model[item.name] = {};
            var checkboxesModel = item.values.reduce(function (p, c) {
              p[c] = false;
              return p
            }, {});
            this$1.$set(this$1.model, item.name, checkboxesModel);
          } else {
            this$1.$set(this$1.model, item.name, '');
          }
        }

        return item
      });
    // Defaults to focusing on first input
    if (this.schema.autofocus !== false) {
      setTimeout(function () { return this$1.$el.querySelector('input').focus(); });
    }
  },
  methods: {
    validateBeforeSubmit: function validateBeforeSubmit () {
      var this$1 = this;

      this.$validator.validateAll().then(function (result) {
        if (result) {
          this$1.$emit('submit');
          return
        }
        this$1.showErrors = true;
        this$1.$el.querySelector(("*[data-vv-id=\"" + (this$1.$validator.errors.items[0].id) + "\"]")).focus();
      });
    },
    camelize: function camelize (str) {
      if (str === undefined) { return }
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
        return Boolean(index) === false ? letter.toLowerCase() : letter.toUpperCase()
      }).replace(/\s+/g, '')
    }
  }
};

function install$1 (Vue) {
  Vue.component('docutap-form', DocutapForm);
}

var options = {
  DocutapSubmit: install,
  DocutapForm: install$1
};

options.install = function (Vue) {
  for (var component in options) {
    var componentInstaller = options[component];

    if (componentInstaller && component !== 'install') {
      Vue.use(componentInstaller);
    }
  }
};

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(options.install);
}

options.version = '0.0.0';

export default options;
