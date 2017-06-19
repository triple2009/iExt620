/**
 * @class iExt.form.field.TagLookup
 * @extends {Ext.form.field.ComboBox}
 * @classdesc iExt 下拉参照。
 */
Ext.define('iExt.form.field.TagLookup', {
    extend: 'Ext.form.field.Tag',
    alias: 'widget.ixtaglookup',

    cls: 'ix-tag-lookup',

    requires: [
        'iExt.form.field.ComboBox'
    ],

    config: {
        /**
         * 参照视图
         */
        ixView: null,
        /**
         * 视图规格
         */
        ixScale: 'normal',
        /**
         * 使用模板形式。模板模式优先。
         * {String[]}
         * ['<div title="{name}: {email}">{name} ({phone})</div>']
         */
        ixItemTpl: null,
        /**
         * 使用列模式。轻量级的表格形式。
         * {Object[]}
         * [{dataIndex:'name', width:80},{dataIndex:'email'}]
         */
        ixColumns: null,
        /**
         * 只适用于列模式。
         * {String} 'all/col/row/none'
         */
        ixLines: 'all',
        /**
         * 缺省搜索条件
         */
        ixFilters: undefined
    },

    /**
     * 可配置主题
     * 可以在主题包中进行重载
     */
    ixTheme: {
        pageSize: 15,
        listMinWidth: 400
    },

    /**
     * 缺省使用仓储标识做为值
     */
    valueField: 'id',
    /**
     * 缺省使用名称做为显示值
     */
    displayField: 'name',

    hideTrigger: false,
    grow: false,
    editable: false,
    selectOnFocus: false,
    triggerOnClick: false,
    // autoselect=true，会自动检索下拉列表的数据
    autoSelect: false,
    pickerOffset: [0, 1],
    defaultListConfig: {
        cls: 'ix-picker'
    },

    initComponent: function () {
        var me = this,
            listConfig = {};

        if (Ext.isEmpty(me.pageSize)) {
            me.pageSize = me.ixTheme.pageSize;
        }

        // 需要同步页面大小的值
        if (me.pageSize > 0) {
            var store = me.getStore();
            Ext.apply(store, {
                pageSize: me.pageSize
            });
            // 设置最小宽度
            listConfig.minWidth = me.ixTheme.listMinWidth;
        }
        me.listConfig = Ext.applyIf(me.listConfig || {}, listConfig);

        var tpl = me.getIxItemTpl(),
            cols = me.getIxColumns(),
            lines = me.getIxLines();
        var tplConfig = iExt.form.field.ComboBox.ixGetItemTplConfig(
            tpl, cols, lines
        );
        me.listConfig = Ext.applyIf(me.listConfig, tplConfig);
        me.callParent();
    },

    applyIxFilters: function (filters) {
        if (filters) {
            this.queryMode = 'remote';
            this.queryParam = 'filter';
        }
        return filters;
    }

});