/**
 * @class iExt.util.Toast
 * @classdesc HFX前端框架提示信息帮助类。
 */
Ext.define('iExt.util.Toast', {
    alternateClassName: 'iExt.Toast',
    singleton: true,

    requires: [
        'Ext.window.Toast'
    ],

    /**
     * 显示提示信息。
     * @memberOf iExt.util.Toast#
     * @param {String} msg 提示的信息。
     */
    ixInfo: function (msg) {
        var me = this;

        // singleton toast window
        if (me._ixToastWin) {
            me._ixToastWin.setHtml(msg);
            me._ixToastWin.show();
        } else {
            me._ixToastWin = Ext.toast({
                html: msg,
                closable: false,
                align: 't',
                slideInDuration: 100,
                renderTo: Ext.getBody(),
                listeners: {
                    destroy: function () {
                        me._ixToastWin = undefined;
                    }
                }
            });
        }
    },

    privates: {

        _ixToastWin: undefined

    }

});