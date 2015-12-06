import Checkbox from './checkbox'
import File from './file'
import Radio from './radio'
import Switch from './switch'
import Text from './text'
import Textarea from './textare'
import Util from './util'

const Select = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'select'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NAME = `mdb${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Default = {
    requiredClasses: ['form-control||c-select']
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Select extends Text {

    constructor(element, config) {
      super(element, $.extend({invalidComponentMatches: [Checkbox, File, Radio, Switch, Text, Textarea]}, Default, config))
    }

    dispose() {
      super.dispose(DATA_KEY)
    }

    static matches($element) {
      if ($element.prop('tagName') === 'select') {
        return true
      }
      return false
    }

    static rejectMatch(component, $element) {
      Util.assert(this.$element, this.matches($element), `${component} component element ${Util.describe($element)} is invalid for <select>.`)
    }

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new Select(this, config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[JQUERY_NAME] = Select._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = Select
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return Select._jQueryInterface
  }

  return Select

})(jQuery)

export default Select
