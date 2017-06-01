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
        return iExt.meta.DataType.BOOLEAN;
    },

    applyIxSubType: function (subtype) {
        if (Ext.isString(subtype)) {
            subtype = iExt.meta.ixtype.Boolean.ixGetValue(subtype.toUpperCase());
        }
        return subtype;
    },

    ixGetColumn: function () {
        var me = this, subType = me.getIxSubType();
        var col = {
            xtype: 'ix-boolcol',
            text: me.ixTitle,
            dataIndex: me.ixName,
            sortable: true,
            ixWeight: me.ixWeight,
            ixLen: me.ixLen,
            // 数据子类型
            ixSubType: subType
        };
        return col;
    },

    // 格式化
    ixFormat: function (value) {
        var subtype = this.getIxSubType();

        if (subtype === iExt.meta.ixtype.Boolean.DUAL) {
            value = Ext.util.Format.date(value, 'Y-m-d');
        } else if (subtype === iExt.meta.ixtype.Boolean.TRIPLET) {
            value = Ext.util.Format.date(value, 'Y-m-d H:i:s');
        }

        return value;
    }

});