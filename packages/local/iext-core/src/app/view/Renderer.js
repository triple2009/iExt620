/**
 * @class iExt.app.view.Renderer
 * @classdesc Grid列渲染器。
 */
Ext.define('iExt.app.view.Renderer', {
    alternateClassName: 'iExt.Renderer',

    requires: [
        'iExt.util.Util'
    ],

    singleton: true,

    ixDate: function (value, metaData) {
        return Ext.util.Format.date(value, 'Y-m-d');
    },

    ixTime: function (value, metaData) {
        return Ext.util.Format.date(value, 'H:i');
    },

    ixDatetime: function (value, metaData) {
        return Ext.util.Format.date(value, 'Y-m-d H:i:s');
    },

    ixYearMonth: function (value, metaData) {
        return Ext.util.Format.date(value, 'Y-m');
    },

    ixInt: function (value, metaData) {
        return Ext.util.Format.number(value, '0');
    },

    ixAmt: function (value, metaData) {
        if (value === 0) { return '&nbsp;'; }
        value = Math.round((value - 0) * 100) / 100;
        value = value === Math.floor(value) ?
            value + '.00' :
            value * 10 === Math.floor(value * 10) ? value + '0' : value;
        value = String(value);
        var ps = value.split('.'),
            whole = ps[0],
            sub = ps[1] ? '.' + ps[1] : '.00',
            r = /(\d+)(\d{3})/;
        while (r.test(whole)) {
            whole = whole.replace(r, '$1' + ',' + '$2');
        }
        value = whole + sub;
        if (value.charAt(0) === '-') {
            return '-¥' + value.substr(1);
        }
        return '¥' + value;
    },

    ixQty: function (value, metaData) {
        return Ext.util.Format.number(value, '0,0.00');
    },

    ixPct: function (value, metaData) {
        return Ext.util.Format.percent(value);
    },

    ixNo: function (value, metaData) {
        var format = '00000000';
        var s = value.toString();
        var l = format.length - s.length;
        for (var i = 0; i < l; i++) {
            s = 0 + s;
        }
        return s;
    },

    ixDual: function (value, metaData) {
        return iExt.Util.ixFormater.ixDual(value);
    },

    ixTriplet: function (value, metaData) {
        return iExt.Util.ixFormater.ixTriplet(value);
    }

});