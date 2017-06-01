/**
 * @class iExt.form.field.TagFilter
 * @extends {iExt.form.field.TagLabel} 
 * @classdesc iExt 筛选条件控件。
 */
Ext.define('iExt.form.field.TagFilter', {
    extend: 'iExt.form.field.TagLabel',
    alias: 'widget.ixtagfilter',

    cls: 'ix-tagfilter',
    triggerCls: 'x-fa fa-search-plus',
    emptyText: '搜索 ···',

    triggers: {
        search: {
            cls: 'x-fa fa-star',
            tooltip: '收藏',
            handler: function () {
                this.ixFavorite();
            }
        }
    },

    initComponent: function () {
        var me = this;
        var trigger = me.getTrigger('picker');
        if (trigger) {
            trigger.setTooltip('筛选');
        }
        me.callParent(arguments);
    },

    ixFavorite: function () {

    }

});