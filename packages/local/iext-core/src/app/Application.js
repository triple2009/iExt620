﻿/**
 * @class iExt.app.Application
 * @extends {Ext.app.Application}
 * @classdesc 应用程序的基础类。
 * logon / logoff 是应用程序级别的处理，应该放在Application中。
 */
Ext.define('iExt.app.Application', {
    extend: 'Ext.app.Application',

    requires: [
        'Ext.app.*',
        'Ext.window.MessageBox',
        'Ext.tip.QuickTipManager',

        'iExt.app.Runtime'
    ],

    ixIsApp: true,

    config: {
        /**
         * 配置文件地址
         */
        ixConfigFile: 'resources/config.json',

        /**
         * 启用的AOP
         */
        ixAops: null,

        /**
         * 登录视图，例如：'app.view.Logon'
         */
        ixLogonView: null,

        /**
         * 主视图，例如：'app.view.Home'
         */
        ixMainView: null,

        /**
         * 控制台视图
         */
        ixConsoleView: null
    },

    /**
     * 重载初始化处理，绑定异常处理，初始化全局控件。
     * @memberOf iExt.app.Application#
     * @param {Exp.app.Application} app 应用程序
     */
    init: function (app) {
        Ext.Error.handle = this.ixOnError;
        Ext.tip.QuickTipManager.init();
    },

    /**
     * 重载启动前（onBeforeLaunch）事件处理。加载配置文件；
     * 设置全局http request filter；初始化应用系统配置ixOnAppStartUp。
     * @memberOf iExt.app.Application#
     */
    onBeforeLaunch: function () {
        Ext.JSON.encodeDate = function (d) {
            return Ext.Date.format(d, '"C"');
        };

        var me = this;
        me.callParent(arguments);

        var console = me.getIxConsoleView();
        if (console) {
            // 设置查看控制台快捷键 ctrl + shift + l
            var keyMap = new Ext.util.KeyMap({
                target: Ext.getBody(),
                key: "l",
                ctrl: true,
                shift: true,
                fn: me._ixShowConsole.bind(me)
            });
        }
    },

    /**
     * 应用程序更新（onAppUpdate）事件处理。
     * @memberOf iExt.app.Application#
     */
    onAppUpdate: function () {
        Ext.Msg.confirm('系统更新', '系统存在新的版本，是否重新加载？',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    },

    /**
     * 自定义全局例外处理。
     * @memberOf iExt.app.Application#
     * @param {Object} err 异常信息对象。
     * @returns {Boolean} 是否处理了异常。
     */
    ixOnError: function (err) {
        var msg = [];
        if (Ext.isArray(err)) {
            msg = err;
        } else if (Ext.isObject(err)) {
            // <debug>
            if (err.sourceClass) {
                msg.push('对象：' + err.sourceClass);
            }
            if (err.sourceMethod) {
                msg.push('方法：' + err.sourceMethod);
            }
            // </debug>
            msg.push('信息：' + err.msg);
        } else {
            msg.push('信息：' + err);
        }
        msg = msg.join('<br/>');
        Ext.MessageBox.alert({
            title: '异常信息',
            message: msg,
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.MessageBox.OK
        });
        // 返回true表示异常已经捕获并且进行了处理。
        return true;
    },

    /**
     * 重载启动（destroy）事件处理。
     * @memberOf iExt.app.Application#
     */
    destroy: function () {
        var me = this;
        if (!me._ixWinDiagnosis) {
            me._ixWinDiagnosis.destroy();
        }
        me.callParent(arguments);
    },

    privates: {

        /**
         * 显示控制台。
         * @memberOf iExt.app.Application#
         */
        _ixShowConsole: function () {
            var me = this;
            if (!me._ixWinConsole) {
                var console = me.getIxConsoleView();
                if (console) {
                    me._ixWinConsole = Ext.create({
                        xtype: console
                    });
                }
            }
            if (me._ixWinConsole && me._ixWinConsole.isWindow === true) {
                me._ixWinConsole.center();
                me._ixWinConsole.show();
            }
        }
    }

});