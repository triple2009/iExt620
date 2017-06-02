/**
 * @class iExt.util.Format
 * @classdesc 格式化帮助类。
 */
Ext.define('iExt.util.Format', {
    alternateClassName: 'iExt.Format',
    singleton: true,

    /**
     * 根据对象属性格式化字符串。
     * @memberOf iExt.util.Util#
     * @param {String} value 要格式化的字符串。
     * @param {Object} data 数据对象。
     * @return {String} 根据数据对象格式化后的字符串。
     */
    ixFormat: function (value, data) {
        if (!value || !data) {
            return value;
        }
        var s = value, reg = new RegExp('\\{(.+?)\\}', 'g');
        var matched = s.match(reg);
        if (matched) {
            for (var i = 0; i < matched.length; i++) {
                var prop = matched[i];
                prop = prop.substr(1, prop.length - 2);
                var val = data.data[prop];
                s = s.replace(matched[i], val);
            }
        }
        return s;
    },

    /**
     * 双态bool数据格式化。
     * @param {Boolean} 值。
     * @return {String} 根据数据对象格式化后的字符串。
     */
    ixDual: function (value) {
        if (value === true) {
            return '■';
        } else {
            return '□';
        }
    },

    /**
     * 三态bool数据格式化。
     * @param {Boolean} 值。
     * @return {String} 根据数据对象格式化后的字符串。
     */
    ixTriplet: function (value) {
        if (value === true) {
            return '■';
        } else if (value === false) {
            return '□';
        } else {
            return '&nbsp;';
        }
    }

});