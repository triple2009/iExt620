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
        return iExt.meta.DataType.STRING;
    },

    applyIxSubType: function (subtype) {
        if (Ext.isString(subtype)) {
            subtype = iExt.meta.ixtype.String.ixGetValue(subtype.toUpperCase());
        }
        return subtype;
    },

    ixGetColumn: function () {
        var me = this, subType = me.getIxSubType();
        var col = {
            xtype: 'ix-col',
            text: me.ixTitle,
            dataIndex: me.ixName,
            sortable: subType === iExt.meta.ixtype.String.STRING,
            ixWeight: me.ixWeight,
            ixLen: me.ixLen,
            // 数据子类型
            ixSubType: subType
        };
        return col;
    }

});