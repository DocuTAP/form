# DocuTAP Form [![npm version](https://badge.fury.io/js/%40docutap-api%2Fform.svg)](https://badge.fury.io/js/%40docutap-api%2Fform)

DocuTAP Form is a form builder library built for [Vue.js](https://vuejs.org/) that builds upon [DocuTAP UI](https://github.com/DocuTAP/ui) and [DocuTAP Inputs](https://github.com/DocuTAP/inputs)

## Features

- Creates a form from a simple object
- Implements the [Vee Validate](https://github.com/baianat/vee-validate) validation library for Vue.js

## Installation

### Dependencies

DocuTAP Form requires the following dependencies: [Vee Validate](https://github.com/baianat/vee-validate), [DocuTAP UI](https://github.com/DocuTAP/ui), and [DocuTAP Inputs](https://github.com/DocuTAP/inputs).

```bash
# Peer dependency
npm install --save vee-validate
# @docutap dependencies
npm install --save @docutap-api/ui @docutap-api/inputs @docutap-api/form
```

## Usage

`main.js`

```javascript
import DocutapForm from '@docutap/form';
import DocutapInputs from '@docutap/inputs';
import DocutapUi from '@docutap/ui';
import Vue from 'vue';
import VeeValidate from 'vee-validate';

Vue.use(DocutapUi);
Vue.use(DocutapInputs);
Vue.use(DocutapForm);
Vue.use(VeeValidate);
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
