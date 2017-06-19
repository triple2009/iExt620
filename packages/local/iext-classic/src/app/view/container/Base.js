/**
 * @class iExt.app.view.container.Base
 * @extends {Ext.panel.Panel} 
 * @classdesc 视图容器。
 */
Ext.define('iExt.app.view.container.Base', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ixviewcontainer',

    requires: [],

    border: false,
    layout: 'fit',
    referenceHolder: true,

    config: {
        /**
         * 领域模型 String / iExt.domain.Domain
         * 领域模型类名称，或者domain的实例
         */
        ixDomain: null
    },

    /**
     * 视图数据模型
     * 缺省值使用 {iExt.app.container.ViewModel}
     */
    viewModel: 'ixviewcontainer',

    initComponent: function () {
        var me = this;

        me.callParent();
    }

});