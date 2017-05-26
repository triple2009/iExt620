/**
 * @mixin iExt.app.view.View
 * @classdesc Grid列渲染器。
 */
Ext.define('iExt.app.view.View', {
    extend: 'Ext.Mixin',

    mixinConfig: {
        id: 'iext-view',
        on: {
            initComponent: 'ixOnInitComponent',
            destroy: 'ixOnDestroy'
        }
    },

    ixHashCode: 0,
    ixIsView: true,

    ixOnInitComponent: function () {
        // <debug>
        Ext.log('init view... ' + this.$className + '...' + this.getId());
        // </debug>
    },

    ixOnDestroy: function () {
        // <debug>
        Ext.log('destroy view... ' + this.$className + '...' + this.getId());
        // </debug>
    }

});