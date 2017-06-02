/**
 * @class iExt.util.Util
 * @classdesc 前端框架帮助类。
 */
Ext.define('iExt.util.Util', {
    alternateClassName: 'iExt.Util',
    singleton: true,

    ixDateNull: new Date('0001-01-01'),
    ixDateMin: new Date('1900-01-01'),
    ixDateMax: new Date('2999-12-31'),

    /**
     * 获取给定参数的hash值。
     */
    ixGetHashCode: function () {
        var hash = 0;
        if (arguments && arguments.length > 0) {
            var args = [];
            for (var i = 0; i < arguments.length; i++) {
                var arg = arguments[i];
                if (Ext.isArray(arg)) {
                    args.push(arg.join(';'));
                } else if (Ext.isObject(arg)) {
                    for (var p in arg) {
                        if (arg.hasOwnProperty(p)) {
                            args.push(p + '=' + arg[p]);
                        }
                    }
                } else {
                    args.push(arg);
                }
            }
            hash = this._ixGetHashCode(args.join(';'));
        }
        return hash;
    },

    /**
    * 区分单双字节计算字符串长度。
    * @memberOf iExt.util.Util#
    * @param {String} value 字符串。
    * @return {Integer} 字符串长度。
    */
    ixLen: function (value) {
        var len = 0;
        for (var i = 0; i < value.length; i++) {
            if (value.charCodeAt(i) < 0 || value.charCodeAt(i) > 255) {
                len = len + 2;
            } else {
                len = len + 1;
            }
        }
        return len;
    },

    privates: {

        _ixRegColor: /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,

        /**
         * 获取给定参数的hash值。
         * @param {String} 字符串数据。
         * @return {Integer} hash值。
         */
        _ixGetHashCode: function (value) {
            var h = 0, len = value.length;
            var tMax = 2147483648;
            for (var i = 0; i < len; i++) {
                h = 31 * h + value.charCodeAt(i);
                //java int 溢出则取模
                if (h > tMax) { h %= tMax; }
            }
            return h;
        }

    }

});