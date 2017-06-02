﻿/**
 * @class iExt.meta.field.String
 * @classdesc 文本字段类。
 */
Ext.define('iExt.meta.field.String', {
    extend: 'iExt.meta.field.Field',
    alias: [
        'ixmeta.string',
        'ixmeta.str'
    ],

    config: {
        ixSubType: 'string'
    },

    applyIxDataType: function (datatype) {
        return iExt.meta.Types.STRING;
    },

    applyIxSubType: function (subtype) {
        if (Ext.isString(subtype)) {
            subtype = iExt.meta.ixtype.String.ixGetValue(subtype.toUpperCase());
        }
        return subtype;
    },

    /**
     * 根据字段属性信息格式化数据。
     * @param {Object} 值。
     * @return {String} 格式化后的字符串。
     */
    ixFormat: function (value) {
        return value;
    }

});