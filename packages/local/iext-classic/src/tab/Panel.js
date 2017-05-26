/**
 * @class iExt.tab.Panel
 * @extends {Ext.tab.Panel} 
 * @classdesc 前端框架TabPanel基础类。
 */
Ext.define('iExt.tab.Panel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.ixtabpanel',

    requires: [
        'Ext.ux.TabCloseMenu'
    ],

    config: {
        ixUseMenu: true
    },

    cls: 'ix-tab-panel',
    bodyCls: 'ix-tab-body',

    plain: true,
    header: false,
    layout: 'fit',

    /**
     * 重载初始化控件。
     * @memberOf iExt.tab.Panel#
     */
    initComponent: function () {
        var me = this;

        me.callParent();
    },

    applyIxUseMenu: function (use) {
        if (use === true) {
            this.plugins = this.plugins || [];
            this.plugins.push('tabclosemenu');
        }
        return use;
    },

    /**
     * 在当前控件上添加一个视图的Tab页。
     * @memberOf iExt.tab.Panel#
     * @param {Ext.Component} view 视图。
     * @param {Object} config 标签配置信息。
     * @return {Ext.Component} 新建的或已经存在的视图对象。
     */
    ixAddView: function (view, config) {
        var me = this, layout = me.getLayout(), hash;

        hash = view.ixHashCode;
        if (!hash) {
            hash = iExt.Util.ixGetHashCode(view.$className);
        }
        Ext.apply(view, { ixHashCode: hash });

        var item = me.child('component[ixHashCode=' + hash + ']');

        if (item) {
            layout.setActiveItem(item);
        } else {
            config = Ext.clone(config) || {};
            Ext.applyIf(config, { title: view.title, closable: true });
            Ext.apply(view, config);
            Ext.suspendLayouts();
            item = me.add(view);
            layout.setActiveItem(item);
            Ext.resumeLayouts(true);
        }
        return item;
    }

});