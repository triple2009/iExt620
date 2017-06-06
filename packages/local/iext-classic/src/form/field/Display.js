/**
 * @class iExt.form.field.Display
 * @extends {Ext.form.field.Display} 
 * @classdesc 显示组件。
 */
Ext.define('iExt.form.field.Display', {
    extend: 'Ext.form.field.Display',
    alias: 'widget.ixdisplay',

    config: {
        /**
         * 
         */
        ixQuick: null
    },

    /**
     * 设置快速查看
     */
    applyIxQuick: function (quick) {
        if (quick === true) {
            this.labelCls = 'ix-quick-lbl';
            this.fieldCls = 'ix-quick-display';
        }
        return quick;
    }

});


