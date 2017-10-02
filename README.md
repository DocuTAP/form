# DocuTAP Form

DocuTAP Form is a form builder library built for [Vue.js](https://vuejs.org/) that builds upon [DocuTAP UI](https://bitbucket.org/docutap/ui/overview) and [DocuTAP Inputs](https://bitbucket.org/docutap/inputs/overview)

## Features

* Creates a form from a simple object
* Implements the [Vee Validate](https://github.com/baianat/vee-validate) validation library for Vue.js

## Installation

### Dependencies

DocuTAP Form requires the following dependencies: [Vee Validate](https://github.com/baianat/vee-validate), [DocuTAP UI](https://bitbucket.org/docutap/ui/overview), and [DocuTAP Inputs](https://bitbucket.org/docutap/inputs/overview).

```bash
npm install --save vee-validate
npm install --save git+ssh://git@bitbucket.org/docutap/form.git#d31f3aa
npm install --save git+ssh://git@bitbucket.org/docutap/inputs.git#d31f3aa
npm install --save git+ssh://git@bitbucket.org/docutap/ui.git#4ef21b4
```

When updating the commit-ish from Bitbucket make sure to source from the [`dist` branch](https://bitbucket.org/docutap/form/branch/dist).

## Usage

`main.js`

```javascript
import DocutapForm from '@docutap/form'
import DocutapInputs from '@docutap/inputs'
import DocutapUi from '@docutap/ui'
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(DocutapUi)
Vue.use(DocutapInputs)
Vue.use(DocutapForm)
Vue.use(VeeValidate)
```

`App.vue`

```html
<template>
  <docutap-form @submit="onSubmit" :schema="schema" :model="formData"></docutap-form>
</template>

<script>
export default {
  name: 'my-app',
  data () {
    return {
      formData: {},
      schema: {
        fields: [
          {
            type: 'info',
            text: 'Welcome to Your Vue.js App',
            image: '/static/logo.png'
          },
          {
            label: 'First name',
            validator: 'required'
          },
          {
            label: 'Last name'
          },
          {
            label: 'Email',
            type: 'email',
            validator: 'required|email'
          },
          {
            label: 'Birthdate',
            type: 'date',
            validator: { required: true, date_format: 'MM/DD/YYYY' }
          },
          {
            label: 'Phone',
            type: 'tel',
            validator: 'required'
          },
          {
            label: 'State',
            type: 'radio',
            validator: 'required',
            values: ['South Dakota', 'North Dakota', 'Alaska']
          },
          {
            label: 'Country',
            type: 'select',
            validator: 'required',
            values: ['Australia', 'Brazil']
          },
          {
            label: 'Hobbies',
            type: 'checkboxes',
            validator: 'required',
            values: ['Kickboxing', 'FarmVille', 'Taking surveys']
          },
          {
            label: 'Water',
            type: 'checkboxes',
            validator: 'required',
            hideLabel: true,
            values: ['20 gallons of water']
          },
          {
            type: 'submit',
            text: 'Send',
            validator: 'required'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('Form submitted!', this.formData)
    }
  }
}
</script>
```
