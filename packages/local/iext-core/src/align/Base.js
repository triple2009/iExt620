/**
 * @class iExt.align.Base
 * @classdesc 用户操作动作组件对齐基础类。
 * 用于控制操作组件需要对齐的组件以及验证条件，
 * 可以根据验证条件判断操作组件是否可用。
 */
Ext.define('iExt.align.Base', {
    alternateClassName: 'iExt.Align',
    alias: 'ixalign.auto',
    aliasPrefix: 'ixalign.',

    mixins: [
        'Ext.mixin.Factoryable'
    ],

    factoryConfig: {
        /**
         * 缺省使用表单对齐
         */
        defaultType: 'form'
    },

    config: {
        /**
         * 对齐方式 true/false
         * 对于表单对齐，表示是否要求数据必须有效
         * 对于列表对齐，表示是否允许操作多条数据
         */
        ixMode: false,

        /**
         * 对齐的目标控件引用标识
         */
        ixTarget: null,

        /**
         * 对齐验证函数
         */
        ixEnabledWhen: null
    },

    constructor: function (config) {
        this.initialConfig = config;
        this.initConfig(config);
    },

    /**
     * 是否可用
     * function (mode, data)
     */
    ixIsEnabled: iExt.unimplFn,

    applyIxEnabledWhen: function (fn) {
        if (Ext.isString(fn)) {
            var me = this;
            var exp = fn;
            fn = function (data) {
                return me._ixEnabledWhen(exp, data);
            };
        }
        return fn;
    },

    privates: {

        /**
         * 字符串验证方法
         */
        _ixEnabledWhen: function (expression, data) {
            var exp = iExt.Format.ixFormat(expression, data);
            if (exp === expression) {
                return true;
            }
            return eval(exp);
        }

    }

});