Ext.define('iExt.meta.field.Number', {
    extend: 'iExt.meta.field.Field',
    alias: [
        'ixmeta.number',
        'ixmeta.num'
    ],

    config: {
        ixSubType: 'qty'
    },

    applyIxDataType: function (datatype) {
        return iExt.meta.DataType.NUMBER;
    },

    applyIxSubType: function (subtype) {
        if (Ext.isString(subtype)) {
            subtype = iExt.meta.ixtype.Number.ixGetValue(subtype.toUpperCase());
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
    },

    // 格式化
    ixFormat: function (value) {
        var subtype = this.getIxSubType();

        if (subtype === iExt.meta.ixtype.Number.QTY) {
            value = Ext.util.Format.number(value, '0,0.00');
        } else if (subtype === iExt.meta.ixtype.Number.AMT) {
            value = Ext.util.Format.number(value, '0,0.00');
        } else if (subtype === iExt.meta.ixtype.Number.PCT) {
            value = Ext.util.Format.percent(value);
        }

        return value;
    }

});