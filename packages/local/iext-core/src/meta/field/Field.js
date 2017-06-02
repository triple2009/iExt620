/**
 * @class iExt.meta.field.Field
 * @classdesc 元数据字段基础类。
 */
Ext.define('iExt.meta.field.Field', {
    alternateClassName: 'iExt.meta.Field',

    mixins: [
        'Ext.mixin.Factoryable'
    ],

    factoryConfig: {
        defaultType: 'string',
        type: 'ixmeta'
    },

    ixIsMetaField: true,

    config: {
        /**
         * 数据类型
         */
        ixDataType: null,
        /**
         * 数据子类型
         */
        ixSubType: null
    },

    /**
     * 属性名称，例如：code
     */
    ixName: null,

    /**
     * 标题，例如：代码
     */
    ixTitle: null,

    /**
     * 标签，例如：用户代码
     */
    ixLabel: null,

    /**
     * 缺省值
     */
    ixDefault: null,

    /**
     * 最大长度，可以根据validator自动设置？
     */
    ixMaxLen: 10,

    /**
     * 导航实体模型 (可用于快速查看或自动导航)
     * {Object} {ixModel:数据模型, ixProperty:仓储标识属性}
     * 例如: 修改用户代码字段可以设置为
     * {ixModel:'User', ixProperty:'createdById'}
     */
    ixNavigator: null,

    /**
     * 构造函数
     */
    constructor: function (config) {
        this.initialConfig = config;
        this.initConfig(config);
    }

});