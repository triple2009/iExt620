Ext.define('iExt.meta.field.Integer', {
    extend: 'iExt.meta.field.Field',
    alias: [
        'ixmeta.integer',
        'ixmeta.int'
    ],

    config: {
        ixSubType: 'int'
    },

    applyIxDataType: function (datatype) {
        return iExt.meta.DataType.INTEGER;
    },

    applyIxSubType: function (subtype) {
        if (Ext.isString(subtype)) {
            subtype = iExt.meta.ixtype.Integer.ixGetValue(subtype.toUpperCase());
        }
        return subtype;
    },

    ixGetColumn: function () {
        var me = this, subType = me.getIxSubType();
        var col = {
            xtype: 'ix-numcol',
            text: me.ixTitle,
            dataIndex: me.ixName,
            sortable: true,
            ixWeight: me.ixWeight,
            ixLen: me.ixLen,
            // 数据子类型
            ixSubType: subType
        };
        return col;
    }

});