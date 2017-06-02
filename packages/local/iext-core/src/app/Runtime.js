/**
 * @class iExt.app.Runtime
 * @extends {Ext.Base} 
 * @classdesc 应用程序运行时类。
 */
Ext.define('iExt.app.Runtime', {
    alternateClassName: 'iExt.Runtime',
    singleton: true,

    requires: [
        'iExt.Ajax'
    ],

    config: {
        // 用户会话标识
        ixSessionKey: 'ix-session',
        // 当前应用程序Application对象
        ixApp: null,
        ixAppConfig: null,

        // 应用程序标识，采用id是为了区分同一个系统的多个应用
        // 例如：培训系统，可以有北京、大连等多个应用
        ixAppId: null,
        ixAppCode: '',
        ixAppName: '',
        ixAppUrl: '',

        ixDebug: false,
        ixMode: 'DEV',

        // 当前登录用户
        ixUser: null
    },

    constructor: function (config) {
        this.initConfig(config);
    },

    ixLoadConfig: function (url) {
        var me = this, d = new Ext.Deferred();

        iExt.Ajax.ixCall(url, 'GET').then(
            function (response, opts) {
                var result = Ext.decode(response.responseText);
                me.setIxAppConfig(result);
                d.resolve(result);
            },
            function (response, opts) {
                d.reject(response);
            });
        return d.promise;
    },

    ixIsDevelop: function () {
        return this.getIxMode() === 'DEV';
    },

    ixGetAppUrl: function (appId) {
        var url = this.getIxAppUrl();
        if (appId) {
            var apps = this.getIxApps();
            if (apps) {
                var app = apps[appId];
                if (app) {
                    url = app.url;
                } else {
                    Ext.raise('未找到应用 [' + appId + '] 的配置信息！');
                }
            } else {
                Ext.raise('未找到扩展应用集合的配置信息！');
            }
        }
        return url;
    },

    applyIxAppConfig: function (appConfig) {
        if (Ext.isObject(appConfig)) {
            appConfig = Ext.clone(appConfig);

            this.setIxAppId(appConfig.appId);
            this.setIxAppCode(appConfig.appCode);
            this.setIxAppName(appConfig.appName);
            this.setIxAppUrl(appConfig.appUrl);

            this.setIxDebug(appConfig.debug || false);
            this.setIxMode(appConfig.mode || 'DEV');

            this.setIxApps(appConfig.apps);
        }
        return appConfig;
    },

    applyIxAppCode: function (code) {
        if (!code) {
            code = 'iExt';
        }
        return code;
    },

    applyIxAppName: function (name) {
        if (!name) {
            name = 'iExt';
        }
        return name;
    },

    updateIxUser: function (user) {
        if (user) {
            sessionStorage.setItem(this.getIxSessionKey(), Ext.encode(user));
        } else {
            sessionStorage.clear();
        }
    },

    getIxUser: function () {
        var user = sessionStorage.getItem(this.getIxSessionKey());
        if (user) {
            return Ext.decode(user);
        }
        return null;
    }

});