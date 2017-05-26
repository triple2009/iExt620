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

    ixColor2Hex: function (value) {
        var me = this, i, reg = new RegExp(me._ixRegColor, 'g');
        if (/^(rgb|RGB)/.test(value)) {
            var aColor = value.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
            var strHex = "#";
            for (i = 0; i < aColor.length; i++) {
                var hex = Number(aColor[i]).toString(16);
                if (hex.length === 1) {
                    hex = '0' + hex;
                }
                strHex += hex;
            }
            if (strHex.length !== 7) {
                strHex = value;
            }
            return strHex;
        } else if (reg.test(value)) {
            var aNum = value.replace(/#/, "").split("");
            if (aNum.length === 6) {
                return value;
            } else if (aNum.length === 3) {
                var numHex = "#";
                for (i = 0; i < aNum.length; i += 1) {
                    numHex += aNum[i] + aNum[i];
                }
                return numHex;
            }
        } else {
            return value;
        }
    },

    ixColor2Rgb: function (value) {
        var me = this, i, reg = new RegExp(me._ixRegColor, 'g');
        var sColor = value.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = "#";
                for (i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for (i = 1; i < 7; i += 2) {
                /*ignore jslint start*/
                sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                /*ignore jslint end*/
            }
            return "RGB(" + sColorChange.join(",") + ")";
        } else {
            return sColor;
        }
    },

    privates: {

        _ixRegColor: /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,

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