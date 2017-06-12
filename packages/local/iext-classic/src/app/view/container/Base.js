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

    config: {

        /**
         * 缺省标题
         * 由于title属性用于绑定，不能直接设置标题？
         * 需要验证绑定属性的赋值操作？
         */
        ixDefaultTitle: null,

        /**
         * 领域模型 String / iExt.domain.Domain
         * 领域模型类名称，或者domain的实例
         */
        ixDomain: null
    },

    bind: {
        /**
         * 绑定标题 ixvcTitle
         */
        title: '{ixvcTitle}'
    },

    /**
     * 视图数据模型
     * 缺省值使用 {iExt.app.container.ViewModel}
     */
    viewModel: 'ixviewcontainer',

    initComponent: function () {
        var me = this;

        me.callParent();
    },

    /**
     * 设置缺省标题
     */
    applyIxDefaultTitle: function (title) {
        title = title || '&#160;';
        return title;
    },

    /**
     * 更新缺省标题
     * 
     */
    updateIxDefaultTitle: function (title, oldTitle) {
        var vm = this.getViewModel();
        vm.ixSetDefaultTitle(title);
    }

});