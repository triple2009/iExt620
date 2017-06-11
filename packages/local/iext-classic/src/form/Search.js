/**
 * @class iExt.form.Search
 * @extends {Ext.form.Panel} 
 * @classdesc 搜索表单控件。
 */
Ext.define('iExt.form.Search', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ixsearchform',

    mixins: [
        'iExt.mixin.SearchView'
    ],

    cls: 'ix-search-form',
    border: false,
    title: '详细搜索',
    header: false,
    referenceHolder: true,

    defaults: {
        anchor: '100%',
        labelAlign: 'left',
        labelWidth: 80,
        msgTarget: 'title',
        margin: '5 5 5 5'
    },

    /**
     * 事件名称：ixsearch / ixquicksearch
     * 缺省使用：ixsearch
     */
    ixEventName: 'ixsearch',

    // 获取是否合法信息
    ixIsValid: function () {
        return this.getForm().isValid();
    },

    ixGetFilter: function () {
        var me = this,
            ixFilters = me.getIxFilters();
        var filters = [];
        if (ixFilters) {
            filters = ixFilters.ixGetFilter(me.getReferences());
        }
        return filters;
    }

});