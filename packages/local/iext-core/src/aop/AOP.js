/**
 * @mixin iExt.aop.AOP
 * @classdesc 面向方面扩展接口。
 */
Ext.define('iExt.aop.AOP', {
    extend: 'Ext.Mixin',

    mixinConfig: {
        id: 'iext-aop'
    },

    ixIsAOP: true,

    ixDebug: false,

    // 配置项名称
    ixConfigName: undefined,

    // 服务地址
    ixUrl: undefined,

    // 接口方法
    ixApis: undefined,

    // 初始化服务
    ixInit: function (appConfig) {
        var aopConfig;
        if (this.ixConfigName) {
            aopConfig = appConfig[this.ixConfigName];
        } else {
            var names = this.$className.split('.');
            names.shift();
            names.shift();
            aopConfig = appConfig[names.join('_')];
        }
        if (aopConfig) {
            this.ixUrl = aopConfig.url;
            var apis = Ext.clone(aopConfig.apis);
            if (apis) {
                this.ixApis = {};
                for (var p in apis) {
                    if (apis.hasOwnProperty(p)) {
                        var api = apis[p];
                        this.ixApis[p] = Ext.applyIf(api, {
                            url: this.ixUrl,
                            enabled: true,
                            method: 'GET',
                            name: p
                        });
                    }
                }
            }
        }
        this.ixInited();
    },

    // 由于接口方法存在依赖关系，可以重载该方法设置相关API的可用性
    ixInited: Ext.emptyFn,

    // 服务是否可用
    ixAopEnabled: function () {
        return this.ixApis !== undefined;
    },

    // 方法是否可用
    ixApiEnabled: function (name) {
        var b = this.ixAopEnabled();
        if (b !== true) { return false; }
        if (!this.ixApis) { return false; }
        var api = this.ixApis[name] || { enabled: false };
        return api.enabled === true;
    },

    ixApiCall: function () {
        if (!arguments) {
            Ext.raise('未指定要调用的服务名称！');
            return;
        }
        var name = arguments[0];
        if (this.ixApiEnabled(name)) {
            Array.prototype.shift.call(arguments);
            return this[name].apply(this, arguments);
        }
    },

    privates: {

        _ixAjaxCall: function (name, data) {
            if (this.ixApiEnabled(name)) {
                var api = this.ixApis[name];
                var url = api.url + '/' + api.name;
                return iExt.Ajax.ixCall(url, api.method, data);
            }
            var d = new Ext.Deferred();
            var reason = '调用的服务 [' + name + '] 不可用！';
            d.reject(reason);
            return d.promise;
        }

    }

});