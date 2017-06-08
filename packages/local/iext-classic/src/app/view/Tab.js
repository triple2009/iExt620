/**
 * @class iExt.app.view.Tab
 * @extends {iExt.app.view.Workspace} 
 * @classdesc 应用程序工作区。
 */
Ext.define('iExt.app.view.Tab', {
    extend: 'iExt.app.view.Workspace',
    xtype: 'widget.ixapptab',

    requires: [

    ],

    cls: 'ix-app-tab',

    initComponent: function () {
        var me = this,
            items = [],
            headerItems = me.getIxHeaderItems() || [],
            home = me.getIxHomeView(),
            form = me.getIxFormView(),
            store = me.getIxAppsStore();

        if (!home) {
            Ext.raise('Card Workspace: 未设置首页视图信息！');
        }

        var tbrItems = [];
        tbrItems.push({
            iconCls: 'x-fa fa-th',
            scale: 'large',
            listeners: {
                click: {
                    fn: me._ixOnSelectApp,
                    scope: me
                }
            }
        }, '->');

        if (headerItems.length > 0) {
            tbrItems.push(headerItems);
        }

        tbrItems.push({
            bind: {
                text: '{ixa.user.code}-{ixa.user.name}'
            },
            iconCls: 'x-fa fa-user',
            menuAlign: 'tr-br',
            menu: {
                shadow: false,
                items: [{
                    text: '修改口令'
                }, {
                    text: '安全退出',
                    listeners: {
                        click: function (item, e, eOpts) {
                            item.fireEvent('ixlogoff');
                        }
                    }
                }]
            }
        });

        var nohelp = me.fireEvent('ixnohelp');
        if (nohelp === false) {
            tbrItems.push({
                iconCls: 'x-fa fa-question-circle',
                listeners: {
                    click: function (item, e, eOpts) {
                        item.fireEvent('ixhelp');
                    }
                }
            });
        }

        items.push({
            xtype: 'ixappheader',
            region: 'north',
            reference: 'ixAppHeader',
            items: tbrItems
        });

        items.push({
            xtype: 'ixquickcontainer',
            region: 'east',
            reference: 'ixAppQuick',
            hidden: false,
            width: 240
        });

        items.push({
            xtype: 'ixtabpanel',
            region: 'center',
            //plain: true,
            reference: 'ixAppMain',
            items: [{
                xtype: 'panel',
                reference: 'ixAppList',
                layout: 'auto',
                title: '应用程序',
                hidden: true,
                bodyCls: 'ix-apps-body',
                items: [{
                    xtype: 'ixappsview',
                    width: 780,
                    store: store,
                    listeners: {
                        selectionchange: {
                            fn: me._ixOnSelectionChange,
                            scope: me
                        }
                    }
                }]
            }, {
                xtype: home
            }, {
                xtype: form
            }]
        });

        me.items = items;
        me.callParent(arguments);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        var ws = me.lookupReference('ixAppMain');
        var layout = ws.getLayout();
        layout.setActiveItem(1);
    },

    /**
     * 打开视图
     * @param {Stirng|Ext.Component} view 视图名称或组件
     * @param {Object} options 选项
     */
    ixOpenView: function (item, view, options) {
        var me = this,
            options = options || {};
        var target = options.target || iExt.action.ViewTarget.MAIN;

        switch (target) {
            case iExt.action.ViewTarget.MAIN:
                me._ixMain(item, view, options);
                break;
            case iExt.action.ViewTarget.QUICK:
                me._ixQuick(item, view, options);
                break;
            case iExt.action.ViewTarget.FORM:
                me._ixForm(item, view, options);
                break;
            case iExt.action.ViewTarget.SELF:
                //me._ixSelf(item, view, options);
                break;
            default:
                break;
        }
    },

    privates: {

        _ixOnSelectApp: function (item, e, opts) {
            var me = this,
                refs = me.getReferences(),
                tbr = refs.ixAppHeader,
                ws = refs.ixAppMain,
                nav = ws.getTabBar(),
                qv = refs.ixAppQuick,
                apps = refs.ixAppList;

            var isApps = tbr._ixApps === true;

            Ext.suspendLayouts();
            if (isApps) {
                qv.setVisible(qv._ixVisible || false);
                item.setIconCls('x-fa fa-th');
            } else {
                qv._ixVisible = qv.isVisible();
                item.setIconCls('x-fa fa-chevron-left');
                qv.setVisible(false);
            }
            tbr.items.each(function (element, index) {
                if (element.ixAppMenu === true) {
                    element.setVisible(isApps);
                }
            });
            var layout = ws.getLayout();
            if (isApps) {
                layout.setActiveItem(me._ixLastActiveItem);
            } else {
                me._ixLastActiveItem = layout.getActiveItem();
                layout.setActiveItem(apps);
            }
            nav.setVisible(isApps);
            Ext.resumeLayouts(true);

            tbr._ixApps = !isApps;
        },

        _ixOnSelectionChange: function (selmodel, selected, eOpts) {
            var me = this,
                refs = me.getReferences(),
                tbr = refs.ixAppHeader,
                ws = refs.ixAppMain,
                nav = ws.getTabBar(),
                qv = refs.ixAppQuick,
                apps = refs.ixAppList;

            var layout = ws.getLayout();
            layout.setActiveItem(me._ixLastActiveItem);

            var app = selected[0];
            var code = app.get('code');
            tbr.items.getAt(0).setVisible(true);
            tbr.items.getAt(0).setIconCls('x-fa fa-th');
            tbr.items.each(function (item, index) {
                if (item.ixAppMenu === true) {
                    tbr.remove(item);
                }
            });
            var idx = 1;
            tbr.insert(idx, {
                xtype: 'ixapptitle',
                ixScale: 'large',
                ixAppMenu: true,
                html: app.get('name')
            });
            idx++;

            var menus = me.getViewModel().getData()[code];
            if (menus) {
                menus.forEach(function (item, index) {
                    tbr.insert(idx, {
                        text: item.name,
                        ixAppMenu: true,
                        listeners: {
                            click: function (item, e, eOpts) {
                                alert('you are clicking ' + item.getText());
                            }
                        }
                    });
                    idx++;
                });
            }

            qv.removeAll();
            qv.setVisible(false);

            nav.setVisible(true);

            tbr._ixApps = false;
        },

        _ixQuick: function (item, view, options) {
            var me = this,
                refs = me.getReferences(),
                qv = refs.ixAppQuick;

            Ext.suspendLayouts();
            if (Ext.isString(view)) {
                view = iExt.View.ixCreate(view, options.viewConfig);
            }
            if (view) {
                qv.removeAll(true);
                qv.add(view);
            }
            qv.setVisible(true);
            Ext.resumeLayouts(true);
        }

    }

});