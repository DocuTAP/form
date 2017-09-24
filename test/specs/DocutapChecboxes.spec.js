import DocutapCheckboxes from 'src/components/docutap-checkboxes/DocutapCheckboxes.vue'
import { createVM } from '../helpers/utils.js'

describe('DocutapCheckboxes.vue', function () {
  it('should render correct contents', function () {
    const vm = createVM(
      this,
      `<form novalidate @submit.prevent="mySubmit">{{errors}}
        <input name="firstName" type="text" v-model="model.firstName" v-validate="'required'" />
        <component :is="'docutap-checkboxes'" :model="model" :schema="schema"></component>
        <button type="submit" value="Submit">Submit</button>{{model}}
      </form>`,
      {
        $validates: true,
        components: { DocutapCheckboxes },
        methods: {
          mySubmit () {
            console.log('submitting...', this.$validator)
            this.$validator.validateAll().then((result) => {
              console.log(result)
            })
          }
        },
        data () {
          return {
            model: {
              firstName: '',
              hobbies: {
                Kickboxing: false,
                FarmVille: false
              }
            },
            schema: {
              label: 'Hobbies',
              name: 'hobbies',
              type: 'checkboxes',
              validator: 'required',
              values: ['Kickboxing', 'Arguing with people online', 'FarmVille', 'Time travel', 'Taking surveys', 'Bull fighting', 'I have 14 cats']
            }
          }
        }
      }
    )
  })
})
