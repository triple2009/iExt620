/**
 * @class iExt.app.Controller
 * @extends {Ext.app.Controller} 
 * @classdesc iExt 应用控制器。
 */
Ext.define('iExt.app.Controller', {
    extend: 'Ext.app.Controller',

    /**
     * 初始化处理，绑定异常处理，初始化全局配置。
     * @memberOf iExt.app.Controller#
     * @param {Exp.app.Application} app 应用程序
     */
    init: function (app) {
        //<debug>
        Ext.log('初始化应用程序 [' + app.getName() + '] ...');
        //</debug>

        Ext.Error.handle = this.ixOnError;

        this.listen({
            global: {
                idle: this.ixOnIdle
            },
            component: {
                "*": {
                    //ixlogon: 'ixOnLogon',
                    //ixlogoff: 'ixOnLogoff',
                    ixopenview: this.ixOnOpenView
                    //ixopenpage: 'ixOnOpenPage'
                }
            }
        });

    },

    ixOnIdle: function () {
        //<debug>
        // Ext.log('应用程序处于空闲 ...');
        //</debug>
    },

    /**
     * 打开视图
     */
    ixOnOpenView: function () {
        var ws = this.getApplication().getMainView();
        if (ws && ws.ixIsWorkspace === true) {
            return ws.ixOpenView.apply(ws, arguments);
        }
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
    }

});