Ext.define('iExt.form.field.SearchField', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.ixsearchfield',

    cls: 'ix-search-field',

    mixins: [
        'iExt.mixin.Search'
    ],

    // 允许回车直接搜索
    enableKeyEvents: true,

    initComponent: function () {
        var me = this,
            triggers = {
                search: {
                    cls: 'x-fa fa-search',
                    scope: me,
                    handler: me.ixOnQuickSearch
                }
            };
        me.setTriggers(triggers);
        me.on('keypress', me._ixOnKeyPress, me);
        me.callParent(arguments);
    },

    ixOnQuickSearch: function (item, trigger, e) {
        var me = this, ixFilters = me.getIxFilters();
        var filters = [];
        if (ixFilters) {
            ixFilters.setIxAlignTo(me);
            filters = ixFilters.ixGetFilter();
            me.fireEvent('ixquicksearch', me, filters);
        }
        e.stopPropagation();
    }

});