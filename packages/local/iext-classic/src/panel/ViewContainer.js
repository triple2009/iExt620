/**
 * @class iExt.panel.ViewContainer
 * @extends {Ext.panel.Panel} 
 * @classdesc 视图容器。
 */
Ext.define('iExt.panel.ViewContainer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ixviewcontainer',

    requires: [],

    header: false,
    border: false,
    layout: 'fit',

    config: {
        // 缺省标题
        ixDefaultTitle: null
    },

    bind: {
        title: '{_ixvc_title}'
    },

    // view container viewmodel
    viewModel: 'ixviewcontainer',

    initComponent: function () {
        var me = this;

        me.callParent();
    },

    applyIxDefaultTitle: function (title) {
        title = title || '&#160;';
        return title;
    },

    updateIxDefaultTitle: function (title, oldTitle) {
        title = title || '&#160;';
        var vm = this.getViewModel();
        vm.setData({
            _ixvc: {
                ixtitle: title
            }
        });
    }

});