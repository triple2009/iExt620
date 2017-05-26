/**
 * @class iExt.app.Card
 * @extends {Ext.container.Viewport} 
 * @classdesc 应用程序的工具栏。
 */
Ext.define('iExt.app.Card', {
    extend: 'Ext.container.Viewport',
    xtype: 'widget.ixappcard',

    requires: [],

    mixins: [
        'iExt.app.view.Workspace'
    ],

    layout: 'border',
    referenceHolder: true,
    
    config: {
        ixHeaderItems: [],
        ixHomeView: undefined,
        ixAppsStore: undefined
    },

    initComponent: function () {
        var me = this, items = [],
            headerItems = me.getIxHeaderItems() || [],
            home = me.getIxHomeView(),
            store = me.getIxAppsStore();

        if (!home) {
            Ext.raise('Card Workspace: 未设置首页视图信息！');
        }

        var tbrItems = [];
        tbrItems.push({
            iconCls: 'x-fa fa-th',
            scale: 'large',
            listeners: {
                click: { fn: me._ixOnSelectApp, scope: me }
            }
        }, '->');

        tbrItems.push(headerItems);

        tbrItems.push({
            xtype: 'ixportrait'
        }, {
                bind: {
                    text: '{ixa.user.code}-{ixa.user.name}'
                },
                menuAlign: 'tr-br',
                menu: {
                    ui: 'ix-app-menu-ui',
                    shadow: false,
                    items: [{
                        text: '修改口令'
                    }, {
                        text: '安全退出'
                    }]
                }
            });

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
            xtype: 'container',
            region: 'center',
            reference: 'ixAppMain',
            layout: 'card',
            items: [{
                xtype: 'panel',
                reference: 'ixAppList',
                layout: 'auto',
                bodyCls: 'ix-apps-body',
                items: [{
                    xtype: 'ixappsview',
                    width: 780,
                    store: store,
                    listeners: {
                        selectionchange: { fn: me._ixOnSelectionChange, scope: me }
                    }
                }]
            }, {
                xtype: home
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

    privates: {

        _ixOnSelectApp: function (item, e, opts) {
            var me = this;
            var tbr = me.lookupReference('ixAppHeader');
            var ws = me.lookupReference('ixAppMain');
            var qv = me.lookupReference('ixAppQuick');
            var apps = me.lookupReference('ixAppList');

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
            Ext.resumeLayouts(true);

            tbr._ixApps = !isApps;
        },

        _ixOnSelectionChange: function (selmodel, selected, eOpts) {
            var me = this;

            var ws = me.lookupReference('ixAppMain');
            var apps = me.lookupReference('ixAppList');
            var layout = ws.getLayout();
            layout.setActiveItem(me._ixLastActiveItem);

            var app = selected[0];
            var code = app.get('code');
            var tbr = me.lookupReference('ixAppHeader');
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

            var qv = me.lookupReference('ixAppQuick');
            qv.removeAll();
            qv.setVisible(false);

            tbr._ixApps = false;
        }

    }

});