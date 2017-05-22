/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('app.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onSelectApp: function (item, e, opts) {
        var tbr = this.lookupReference('tbrMain');
        var ws = this.lookupReference('wsMain');
        var isApps = tbr.ixApps === true;
        if (isApps) {
            item.setIconCls('x-fa fa-th');
        } else {
            item.setIconCls('x-fa fa-chevron-left');
        }
        tbr.items.each(function (element, index) {
            if (element.ixAppMenu === true) {
                element.setVisible(isApps);
            }
        });
        ws.items.getAt(0).setVisible(!isApps);
        ws.items.getAt(1).setVisible(isApps);
        tbr.ixApps = !isApps;
    },

    onAppChange: function (panel, app) {
        panel.setVisible(false);
        var code = app.get('code');
        var menus = this.getViewModel().getData()[code];
        var tbr = this.lookupReference('tbrMain');
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
        menus.forEach(function (item, index) {
            tbr.insert(idx, {
                text: item.name,
                ixAppMenu: true
            });
            idx++;
        });
        panel.ownerCt.items.getAt(1).setVisible(true);
        tbr.ixApps = false;
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});