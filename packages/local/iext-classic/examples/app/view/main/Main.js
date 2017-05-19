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
        defaults: {
        },
        items: [{
            iconCls: 'x-fa fa-th',
            scale: 'medium'
        }, {
            xtype: 'label',
            scale: 'medium',
            text: 'CRM'
        }, '->', {
            text: 'administrator'
        }]
    },

    items: [{
        title: 'Home',
        iconCls: 'fa-home'
    }]
});
