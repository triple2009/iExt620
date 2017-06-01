Ext.define('iExt.meta.field.Date', {
    extend: 'iExt.meta.field.Field',
    alias: [
        'ixmeta.date'
    ],

    config: {
        ixSubType: 'date'
    },

    applyIxDataType: function (datatype) {
        return iExt.meta.DataType.DATE;
    },

    applyIxSubType: function (subtype) {
        if (Ext.isString(subtype)) {
            subtype = iExt.meta.ixtype.Date.ixGetValue(subtype.toUpperCase());
        }
        return subtype;
    },

    ixGetColumn: function () {
        var me = this, subType = me.getIxSubType();
        var col = {
            xtype: 'ix-datecol',
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

        if (subtype === iExt.meta.ixtype.Date.DATE) {
            value = Ext.util.Format.date(value, 'Y-m-d');
        } else if (subtype === iExt.meta.ixtype.Date.DATETIME) {
            value = Ext.util.Format.date(value, 'Y-m-d H:i:s');
        } else if (subtype === iExt.meta.ixtype.Date.TIME) {
            value = Ext.util.Format.date(value, 'H:i');
        }

        return value;
    }

});