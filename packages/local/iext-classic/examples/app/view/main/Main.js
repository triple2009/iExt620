/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('app.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [],

    tbar: {
        xtype: 'ixapptbr',
        items: [{
            iconCls: 'x-fa fa-th',
            scale: 'medium',
            listeners: {
                mouseover: function (item, e, eOpts) {
                    item.setIconCls('x-fa fa-chevron-left');
                },
                mouseout: function (item, e, eOpts) {
                    item.setIconCls('x-fa fa-th');
                }
            }
        }, {
            xtype: 'ixapptitle',
            ixScale: 'medium',
            html: '培训管理系统'
        }, '->', {
            xtype: 'ixportrait'
        }, {
            text: 'administrator',
            menu: {
                ui: 'ix-app-menu',
                items: [{
                    text: '修改口令'
                }, {
                    text: '安全退出'
                }]
            }
        }]
    },

    items: [{
        title: 'Home',
        iconCls: 'x-fa fa-home'
    }]
});
