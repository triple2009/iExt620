/**
 * @class iExt.form.field.Text
 * @extends {Ext.form.field.Text} 
 * @classdesc iExt 输入控件。
 */
Ext.define('iExt.form.field.Text', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.ixtext',

    config: {
        ixScale: undefined
    },

    initComponent: function () {
        var me = this,
            scale = me.getIxScale();
        if (scale) {
            me.addCls('ix-text-' + scale);
        }

        me.callParent(arguments);
    },

    applyIxScale: function (scale) {
        return scale;
    }

});