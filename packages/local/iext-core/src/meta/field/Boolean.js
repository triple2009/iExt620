/**
 * @class iExt.meta.Base
 * @extends {iExt.meta.Meta} 
 * @classdesc 元数据基础类。
 */
Ext.define('iExt.meta.field.Boolean', {
    extend: 'iExt.meta.field.Field',
    alias: [
        'ixmeta.boolean',
        'ixmeta.bool'
    ],

    config: {
        ixSubType: 'dual'
    },

    applyIxDataType: function (datatype) {
        return iExt.meta.Types.BOOLEAN;
    },

    applyIxSubType: function (subtype) {
        if (Ext.isString(subtype)) {
            subtype = iExt.meta.ixtype.Boolean.ixGetValue(subtype.toUpperCase());
        }
        return subtype;
    },

    /**
     * 根据字段属性信息格式化数据。
     * @param {Object} 值。
     * @return {String} 格式化后的字符串。
     */
    ixFormat: function (value) {
        if (subtype === iExt.meta.ixtype.Boolean.DUAL) {
            value = iExt.util.Format.ixDual(value);
        } else if (subtype === iExt.meta.ixtype.Boolean.TRIPLET) {
            value = Ext.util.Format.ixTriplet(value);
        }
        return value;
    }

});