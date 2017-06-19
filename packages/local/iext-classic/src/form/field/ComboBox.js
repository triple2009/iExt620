/**
 * @class iExt.form.field.ComboBox
 * @extends {Ext.form.field.ComboBox} 
 * @classdesc 显示组件。
 */
Ext.define('iExt.form.field.ComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.ixcombo',

    cls: 'ix-combo',

    config: {
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
        ixLines: 'none',
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
    valueField: 'value',
    /**
     * 缺省使用名称做为显示值
     */
    displayField: 'text',

    minChars: 2,
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

        var tpl = me.getIxItemTpl();
        var cols = me.getIxColumns();
        var lines = me.getIxLines();
        var tplConfig = iExt.form.field.ComboBox.ixGetItemTplConfig(
            tpl, cols, lines
        );
        me.listConfig = Ext.applyIf(me.listConfig, tplConfig);
        me.callParent();
    },

    getParams: function (queryString) {
        var params = {},
            param = this.queryParam;

        if (param) {
            params[param] = Ext.encode([{
                "dataType": "STRING",
                "operator": "like",
                "relation": "AND",
                "property": "code",
                "value": queryString
            }]);
        }
        return params;
    },

    /**
     * 设置列集合
     */
    applyIxColumns: function (cols) {
        var me = this;
        if (cols) {
            if (!Ext.isArray(cols)) {
                Ext.raise('使用列模式需要定义有效的列数组！');
            }
        }
        return cols;
    },

    applyIxFilters: function (filters) {
        if (filters) {
            this.queryMode = 'remote';
            this.queryParam = 'filter';
        }
        return filters;
    },

    statics: {

        /**
         * 根据自定义模板、列集合、线型获取列表配置
         */
        ixGetItemTplConfig: function (tpl, cols, lines) {
            var listConfig = {};
            if (tpl) {
                listConfig.itemTpl = tpl;
            } else {
                if (cols) {
                    listConfig.cls = 'ix-picker';
                    if (lines === 'row' || lines === 'all') {
                        listConfig.cls += ' ix-rows';
                    } else if (lines === 'col') {
                        listConfig.cls += ' ix-cols';
                    }
                    var i = 1,
                        item = '',
                        total = cols.length;
                    tpl = [];
                    Ext.each(cols, function (col) {
                        item = '<span class="ix-col';
                        // 后续列加左边框线
                        if (i < total && (lines === 'col' || lines === 'all')) {
                            item += ' ix-line';
                        }
                        item += '"';
                        if (col.width) {
                            item += ' style="width:' + col.width + 'px;"';
                        }
                        item += '>{' + col.dataIndex + '}</span>'
                        tpl.push(item);
                        i++;
                    });
                    listConfig.itemTpl = tpl;
                }
            }
            return listConfig;
        }
    }

});