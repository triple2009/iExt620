/**
 * @class iExt.Theme
 * @classdesc iExt 主题配置信息。
 */
Ext.define('iExt.Theme', {
    singleton: true,

    ixWidthFact: 9,
    ixScrollWidth: 25,
    // 下拉分页参照的最小宽度，参见iExt.form.lookup.ComboBox
    ixPagingMinWidth: 350,
    // Twin分页参照的最小宽度，参见iExt.view.lookup.Twin
    ixTwinPagingMinWidth: 305,

    Logon: {
        ixMinWidth: 220
    },

    // TreeList的配置，参见iExt.tree.List
    TreeList: {
        ixMicroWidth: 36
    },

    Grid: {

        // 缺省列宽设置
        ixColWidths: {
            FACT: 9,
            DATE: 90,
            DATETIME: 150,
            TIME: 60,
            QTY: 100,
            PRC: 90,
            AMT: 100,
            PCT: 60,
            BOOLEAN: 60
        },

        // checkbox 选择列的宽度
        ixCheckBoxModelWidth: 30,

        // 自适应列的最小宽度
        ixFlexMinWidth: 80,

        // 缺省页大小
        ixDefaultPageSize: 20,

        // 缺省参照页大小
        ixLookupPageSize: 10
    },

    Paging: {
        ixInfoWeight: 7,
        ixLabelWeight: 5,
        ixMinWidth: 350
    },

    Tag: {
        ixGrowMin: 22,
        ixGrowMax: 400
    }

});
