/**
 * @class iExt.meta.field.Field
 * @classdesc 元数据字段基础类。
 */
Ext.define('iExt.meta.field.Field', {
    alternateClassName: 'iExt.meta.Field',
    alias: 'ixmeta.field.auto', 
    aliasPrefix: 'ixmeta.field.',

    mixins: [
        'Ext.mixin.Factoryable'
    ],

    factoryConfig: {
        /**
         * 缺省是文本字段
         */
        defaultType: 'string'
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
     * 序号，例如：10
     */
    ixNo: 0,

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
    ixMaxLen: 16,

    /**
     * 导航实体模型 (可用于快速查看或自动导航)
     * {Object} {ixModel:数据模型, ixProperty:仓储标识属性}
     * 例如: 修改用户代码字段可以设置为
     * {ixModel:'User', ixProperty:'createdById'}
     */
    ixNavigator: null,

    /**
     * 缺省排序方式 (ASC/DESC)
     */
    ixSortDir: null,

    /**
     * 仓储标识(true/false)
     */
    ixIsRepoId: false,

    /**
     * 实体标识 (true/false)
     */
    ixIsEntityId: false,

    /**
     * 实体描述 (true/false)
     */
    ixIsEntityDesc: false,

    /**
     * 构造函数
     */
    constructor: function (config) {
        this.initialConfig = config;
        this.initConfig(config);
    }

});