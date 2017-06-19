/**
 * @class iExt.form.field.LookupCombo
 * @extends {Ext.form.field.ComboBox}
 * @classdesc iExt 下拉参照。
 */
Ext.define('iExt.form.field.LookupCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.ixlookupcombo',

    cls: 'ix-lookup-combo',

    config: {
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
        pageSize: 15
    },

    valueField: 'id',
    displayField: 'code',
    delimiter: ',',
    minChars: 2,

    constructor: function (config) {
        var me = this;
        if (Ext.isEmpty(me.pageSize)) {
            me.pageSize = me.ixTheme.pageSize;
        }
        me.callParent();
    },

    initComponent: function () {
        var me = this;

        // 设置选项模板
        if (me.ixDisplayFields) {
            var tpl = [];
            tpl.push('<ul class="x-list-plain">');
            tpl.push('<tpl for=".">');

            if (me.ixDisplayFields.length === 1) {
                tpl.push('<li class="x-boundlist-item">');
                tpl.push('{' + me.displayField + '}' +
                    ', {' + me.ixDisplayFields[0].ixName + '}');
                tpl.push('</li>');
            } else {
                tpl.push('<li class="x-boundlist-item">');
                tpl.push('{' + me.displayField + '}');
                tpl.push('</li>');
                tpl.push('<li class="ix-item-fields">');
                var fieldTpl;
                Ext.each(me.ixDisplayFields, function (field) {
                    fieldTpl = '<span class="ix-item-field">';
                    fieldTpl += '{' + field.ixName + '}';
                    fieldTpl += '</span>';
                    tpl.push(fieldTpl);
                });
                tpl.push('</li>');
            }

            tpl.push('</tpl>');
            tpl.push('</ul>');
            me.tpl = tpl;

            // 如果分页，设置最小宽度为分页栏的最小宽度
            if (me.pageSize > 0) {
                me.listConfig = me.listConfig || {};
                Ext.applyIf(me.listConfig, {
                    minWidth: iExt.Theme.ixPagingMinWidth
                });
            }
        }

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

    applyIxFilters: function (filters) {
        if (filters) {
            this.queryMode = 'remote';
            this.queryParam = 'filter';
        }
        return filters;
    }

});