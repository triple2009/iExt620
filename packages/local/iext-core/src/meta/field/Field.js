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
        // 数据类型
        ixDataType: undefined,
        // 数据子类型
        ixSubType: undefined
    },

    // 名称
    ixName: undefined,

    // 列标题
    ixTitle: undefined,

    // 标签
    ixLabel: undefined,

    // 缺省值
    ixDefault: undefined,

    // 最大长度，可以根据validator自动设置
    ixMaxLen: 10,
    
    // 导航实体模型 (可用于快速查看或自动导航)
    // {Object} {ixModel:数据模型, ixProperty:仓储标识属性}
    // 例如: 修改用户代码字段可以设置为
    // {ixModel:'User', ixProperty:'createdById'}
    ixNavigator: undefined,

    constructor: function (config) {
        this.initialConfig = config;
        this.initConfig(config);
    }

});