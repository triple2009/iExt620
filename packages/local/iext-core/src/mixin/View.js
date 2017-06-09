/**
 * @mixin iExt.mixin.View
 * @extends {Ext.Mixin} 
 * @classdesc iExt视图 MIXIN。
 */
Ext.define('iExt.mixin.View', {
    extend: 'Ext.Mixin',

    mixinConfig: {
        id: 'iext-view',
        on: {
            initComponent: 'ixOnInitComponent',
            destroy: 'ixOnDestroy',
            afterRender: 'ixOnAfterRender'
        }
    },

    ixIsView: true,

    /**
     * 视图的hash值，用于路由
     */
    ixHashCode: 0,

    /**
     * 与该视图对齐的操作组件标识集合
     * 在视图控制器加载时会自动设置
     */
    ixAlignItemIds: null,

    /**
     * 初始化视图处理。
     */
    ixOnInitComponent: function () {
        // <debug>
        iExt.log('初始化视图', this.$className, this.getId());
        // </debug>
    },

    /**
     * 析构视图处理。
     */
    ixOnDestroy: function () {
        // <debug>
        iExt.log('销毁视图', this.$className, this.getId());
        // </debug>
    },

    /**
     * 渲染后处理
     */
    ixOnAfterRender: function () {
        // <debug>
        iExt.log('视图已渲染', this.$className, this.getId());
        // </debug>
    }

});