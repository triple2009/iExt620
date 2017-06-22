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
         * 对齐的目标控件标识
         * 在视图加载中会自动设置该值
         */
        ixTargetId: null,

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
     * 设置对齐组件引用
     */
    applyIxTarget: function (target) {
        if (Ext.isEmpty(target)) {
            this.ixAutoTarget = true;
        }
        return target;
    },

    /**
     * 自动对齐的操作组件。
     * 由于存在动态对齐操作组件的场景，例如列表视图
     * 需要根据视图的变化自动设置对齐。
     * 如果第一次设置后就无法识别下次的对齐处理。
     */
    ixAutoTarget: false,

    /**
     * 是否可用
     * function (mode, data)
     */
    ixIsEnabled: iExt.unimplFn,

    /**
     * 获取需要处理的数据
     * 需要根据对齐的组件标识获取相应的数据
     * @return {Object[]} 
     */
    ixGetAlignData: iExt.unimplFn,

    applyIxEnabledWhen: function (fn) {
        if (Ext.isString(fn)) {
            var me = this;
            var exp = fn;
            fn = function (data) {
                return me._ixEvalEnabledWhen(exp, data);
            };
        }
        return fn;
    },

    privates: {

        /**
         * 字符串验证方法
         */
        _ixEvalEnabledWhen: function (expression, data) {
            var exp = iExt.Format.ixFormat(expression, data);
            if (exp === expression) {
                return true;
            }
            return eval(exp);
        }

    }

});