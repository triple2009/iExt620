Ext.define('app.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [],
    controller: 'main',
    viewModel: 'main',

    layout: 'border',
    tbar: {
        xtype: 'ixapptbr',
        reference: 'tbrMain',
        items: [{
            iconCls: 'x-fa fa-th',
            scale: 'large',
            hidden: true,
            listeners: {
                click: 'onSelectApp'
            }
        }, '->', {
            xtype: 'ixportrait'
        }, {
            text: 'administrator',
            menuAlign: 'tr-br',
            menu: {
                ui: 'ix-app-menu-ui',
                items: [{
                    text: '修改口令'
                }, {
                    text: '安全退出'
                }]
            }
        }]
    },

    items: [{
        xtype: 'ixquickview',
        region: 'east',
        hidden: true,
        width: 240
    }, {
        xtype: 'container',
        region: 'center',
        reference: 'wsMain',
        layout: 'fit',
        items: [{
            xtype: 'app-apps',
            listeners: {
                ixappchange: 'onAppChange'
            }
        }, {
            xtype: 'app-home',
            hidden: true
        }]
    }]
});