/**
 * @class iExt.form.field.SearchField
 * @extends {Ext.form.field.Text}
 * @classdesc 搜索容器组件。
 */
Ext.define('iExt.form.field.SearchField', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.ixsearchfield',

    cls: 'ix-search-field',

    mixins: [
        'iExt.mixin.Search',
        'iExt.mixin.Action'
    ],

    /**
     * 允许回车直接搜索
     */
    enableKeyEvents: true,

    initComponent: function () {
        var me = this,
            target = me.getIxAlignTarget(),
            triggers = {
                search: {
                    cls: 'x-fa fa-search',
                    scope: me,
                    handler: me.ixOnQuickSearch
                }
            };

        me.setIxAlign({
            type: 'list',
            ixMode: null,
            ixTarget: target
        });

        me.setTriggers(triggers);
        me.on('keypress', me._ixOnKeyPress, me);
        me.callParent(arguments);
    },

    ixOnQuickSearch: function (item, trigger, e) {
        var me = this, ixFilters = me.getIxFilters();
        var filters = [];
        if (ixFilters) {
            // 设置输入框为对齐的组件
            ixFilters.setIxAlignTarget(me);
            filters = ixFilters.ixGetFilter();
            me.fireEvent('ixquicksearch', me, filters);
        }
        e.stopPropagation();
    }

});