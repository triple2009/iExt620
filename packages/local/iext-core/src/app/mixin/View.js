/**
 * @mixin iExt.app.mixin.View
 * @classdesc iExt视图 MIXIN。
 */
Ext.define('iExt.app.mixin.View', {
    extend: 'Ext.Mixin',

    mixinConfig: {
        id: 'iext-view',
        on: {
            initComponent: 'ixOnInitComponent',
            destroy: 'ixOnDestroy'
        }
    },

    /**
     * 视图的hash值，用于路由
     */
    ixHashCode: 0,

    ixIsView: true,

    /**
     * 初始化视图处理。
     */
    ixOnInitComponent: function () {
        // <debug>
        Ext.log('init view... ' + this.$className + '...' + this.getId());
        // </debug>
    },

    /**
     * 析构视图处理。
     */
    ixOnDestroy: function () {
        // <debug>
        Ext.log('destroy view... ' + this.$className + '...' + this.getId());
        // </debug>
    }

});