/**
 * @class iExt.filter.Base
 * @extends {Ext.Base} 
 * @classdesc 筛选条件基础类。
 */
Ext.define('iExt.filter.Base', {
    alternateClassName: 'iExt.Filter',
    alias: 'ixfilter.auto',
    aliasPrefix: 'ixfilter.',

    mixins: [
        'Ext.mixin.Factoryable'
    ],

    requires: [
        'iExt.meta.Types',
        'iExt.meta.ixtype.*',
        'iExt.filter.Operators'
    ],

    factoryConfig: {
        /**
         * 缺省是文本
         */
        defaultType: 'string'
    },

    ixIsFilter: true,

    config: {
        /**
         * 对齐控件的 reference
         */
        ixAlignTarget: null,
        /**
         * 数据类型
         */
        ixDataType: null,
        /**
         * 数据子类型
         */
        ixSubType: null,
        /**
         * 操作符
         */
        ixOperator: 'eq'
    },

    /**
     * 对应的实体属性名称
     */
    ixProperty: '',
    /**
     * 筛选条件值
     */
    ixValue: '',

    constructor: function (config) {
        this.initialConfig = config;
        this.initConfig(config);
    },

    /**
     * 设置操作符
     */
    applyIxOperator: function (op) {
        if (Ext.isString(op)) {
            op = iExt.filter.Operators.ixGetValue(op.toUpperCase());
        }

        // 验证指定的操作符是否合法
        // <debug>
        if (op) {
            var name = iExt.filter.Operators.ixGetName(op);
            var item = iExt.filter.Operators.ixGetItem(op);
            var b = false;
            Ext.each(this.ixOperators(), function (item) {
                if (item[iExt.filter.Operators.ixValueProperty] === op) {
                    b = true;
                    return false;
                }
            });
            if (!b) {
                Ext.raise('该搜索条件不允许使用【' + name + '】操作符！');
            }
        }
        // </debug>
        return op;
    },

    /**
     * 获取搜索条件
     * @param {Obect} references 组件引用对象
     */
    ixGetFilter: function (references) {
        var me = this, filter, value,
            ref = me.getIxAlignTarget();

        if (!ref) {
            // 未指定 ref 表示固定条件
            // 直接使用 ixValue 的值
            value = me.ixValue;
            // <debug>
            iExt.log('该搜索条件未指定值控件引用，直接使用值', value);
            // </debug>
        } else {
            // ixAlignTarget可能是控件或控件引用
            var cmp;
            if (Ext.isString(ref) && references) {
                cmp = references[ref];
            } else if (ref.isComponent === true) {
                // 对于ixsearchfield可以直接设置控件
                cmp = ref;
            }
            if (cmp) {
                if (cmp.ixGetValue) {
                    // 扩展定义的获取值的方法
                    value = cmp.ixGetValue();
                } else {
                    value = cmp.getValue();
                }
            }
        }
        value = me._ixGetValue(value);
        if (!Ext.isEmpty(value)) {
            var opName = iExt.filter.Operators.ixGetName(me.getIxOperator());
            filter = {
                dataType: me._ixGetDataType(),
                operator: iExt.filter.Operators.ixOperators[opName],
                property: me.ixProperty,
                value: value
            };
        }
        return filter;
    },

    /**
     * 获取可以使用的操作符
     */
    ixOperators: iExt.unimplFn,

    privates: {

        /**
         * 获取搜索值的方法，不同的搜索类型可以重载此方法
         */
        _ixGetValue: function (value) {
            return value;
        },

        /**
         * 获取搜索数据类型的方法，不同的搜索类型可以重载此方法
         */
        _ixGetDataType: function () {
            var me = this, type = me.getIxDataType();
            return iExt.meta.Types.ixGetName(type);
        }

    }

});