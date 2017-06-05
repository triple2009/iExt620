/**
 * @class iExt.toolbar.Action
 * @extends {Ext.toolbar.Toolbar} 
 * @classdesc 用户操作工具栏控件。
 */
Ext.define('iExt.toolbar.Action', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.ixacttbr',

    requires: [
    ],

    cls: 'ix-act-tbr',
    overflowHandler: 'scroller',

    defaults: {
        xtype: 'ixactbtn'
    },

    config: {
        /**
         * 对齐的目标控件引用标识
         */
        ixAlignTarget: null,

        /**
         * 授权服务代码
         */
        ixAuthService: null
    },

    /**
     * 重载初始化控件。主要是根据HFX配置项创建搜索项目和搜索按钮。
     * @memberOf iExt.toolbar.Action#
     */
    initComponent: function () {
        var me = this;
        var service = me.getIxAuthService();

        // 如果授权服务不为空，监听添加组件事件
        // 对于未指定服务的操作组件设置授权服务
        if (service !== null) {
            me.on('beforeadd', me._ixBeforeAdd, me);
        }
        
        me.callParent();
    },

    /**
     * 根据用户授权设置工具栏项目。
     * @memberOf iExt.toolbar.Action#
     * @param {Object} auths 用户授权信息。
     */
    ixSetUserAuth: function (auths) {
        this.setDisabled(false);
        //<debug>
        if (!auths) {
            Ext.raise('未指定用户的授权信息！');
        }
        //</debug>
        this._ixSetUserAuth(this.items, auths);
    },

    privates: {

        _ixBeforeAdd: function (toolbar, component, index, eOpts) {
            if (component.ixIsAction === true) {
                var service = toolbar.getIxAuthService();
                var auth = component.getIxAuth();
                if (Ext.isString(auth)) {
                    auth = {
                        ixService: service,
                        ixOperation: auth
                    };
                    component.setIxAuth(auth);
                }
            }
        },

        /**
         * 根据用户授权设置工具栏项目，递归设置所有项目。
         * @memberOf iExt.toolbar.Action#
         * @private
         * @param {Obejct[]} items 工具栏项目集合
         * @param {Object} auths 用户授权信息。
         */
        _ixSetUserAuth: function (items, auths) {
            var me = this, service = me.ixAuthService();
            items.each(function (item) {
                if (item.ixIsAction !== true) { return; }
                if (!item.getIxService()) {
                    item.setIxService(service);
                }
                item.ixSetUserAuth(auths);
                if (item.menu) {
                    me._ixInnerSetUserAuth(item.menu.items, auths);
                }
            });
        }

    }

});