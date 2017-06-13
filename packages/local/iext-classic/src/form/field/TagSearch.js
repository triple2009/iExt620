/**
 * @class iExt.form.field.TagSearch
 * @extends {Ext.form.field.Tag} 
 * @classdesc iExt 筛选条件控件。
 */
Ext.define('iExt.form.field.TagSearch', {
    extend: 'Ext.form.field.Tag',
    alias: 'widget.ixtagsearch',

    mixins: [
        'iExt.mixin.FilterView',
        'iExt.mixin.Action'
    ],

    config: {
        /**
         * 筛选条件视图
         */
        ixView: null,
        /**
         * 视图规格
         */
        ixScale: 'normal'
    },

    cls: 'ix-tagsearch',
    hideTrigger: false,
    grow: false,
    editable: false,
    selectOnFocus: false,
    triggerOnClick: false,
    triggerCls: 'x-fa fa-search-plus',
    // autoselect=true，会自动检索下拉列表的数据
    autoSelect: false,
    emptyText: '搜索 ···',

    /*
    tagItemCls: 'ix-tagsearch-item',
    tagItemTextCls: 'ix-tagsearch-item-text',
    tagItemCloseCls: 'ix-tagsearch-item-close',

    tagItemSelector: '.ix-tagsearch-item',
    tagItemCloseSelector: '.ix-tagsearch-item-close',
    tagSelectedCls: 'ix-tagsearch-item-selected',
    */

    triggers: {
        favorite: {
            cls: 'x-fa fa-star',
            tooltip: '收藏',
            handler: function () {
                this.ixFavorite();
            }
        }
    },

    createPicker: function () {
        var me = this, picker;
        picker = me.picker = Ext.create({
            xtype: 'ixsearchcontainer',
            floating: true,
            header: false,
            items: [{
                xtype: me.getIxView()
            }],
            listeners: {
                ixclose: {
                    fn: me._ixOnClose,
                    scope: me
                }
            },
            // hack some methods
            refresh: Ext.emptyFn,
            getNavigationModel: Ext.emptyFn,
            getSelectionModel: Ext.emptyFn
        });
        return picker;
    },

    initComponent: function () {
        var me = this;
        me.setIxAlign({
            type: 'list',
            ixMode: null
        });

        var trigger = me.getTrigger('picker');
        if (trigger) {
            trigger.setTooltip('筛选');
        }

        var store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'memory',
                reader: 'json'
            }
        });
        me.store = store;
        me.valueField = 'value';
        me.displayField = 'text';

        me.callParent(arguments);
    },

    /**
     * 重载关闭Tag时触发的处理过程，删除Store中的记录。
     * @memberOf iExt.form.field.TagLabel#
     * @param {Element} itemEl 关闭的标签对象。
     */
    removeByListItemNode: function (itemEl) {
        var me = this, removable = true,
            rec = me.getRecordByListItemNode(itemEl);

        if (rec) {
            if (me.picker) {
                removable = me.picker.ixRemoveFilter(rec.get('value'));
            }
            if (removable === false) {
                me.setValue(me.store.getRange());
                return;
            }
            me.store.remove(rec);
        }
        var filters = [];
        Ext.each(me.store.getRange(0), function (record) {
            filters.push(record.get('value'));
        });
        me.callParent(arguments);
        me.fireEvent('ixsearch', me, filters);
    },

    /**
     * 重载 MultiSelectItemTpl，对于不能删除的条件去掉删除按钮
     * 原始的 tpl: "<tpl for=".">
     * <li data-selectionIndex="{[xindex - 1]}" data-recordId="{internalId}" 
     * role="presentation" class="x-tagfield-item
     * <tpl if="this.isSelected(values)"> x-tagfield-item-selected</tpl>
     * {%values = values.data;%}">
     * <div role="presentation" class="x-tagfield-item-text">
     * {[this.getItemLabel(values)]}</div>
     * <div role="presentation" class="x-tagfield-item-close">
     * </div></li></tpl>"
     */
    getMultiSelectItemMarkup: function () {
        var me = this;
        if (!me.ixMultiSelectItemTpl) {
            me.callParent();
            me.ixMultiSelectItemTpl = me.multiSelectItemTpl;

            var html = me.ixMultiSelectItemTpl.html;

            // 调整不能关闭的 tagfield-item 右边距
            var injectAt = 'x-tagfield-item-selected</tpl>';
            var injectTpl = injectAt + '<tpl if="!values.data.removable"> ix-tagfield-noclose</tpl>';
            var tpls = html.split(injectAt);
            html = tpls.join(injectTpl);

            // 对于不能关闭的 tagfield-item 去掉关闭按钮
            injectAt = '<div role="presentation" class="x-tagfield-item-close"></div>';
            injectTpl = '<tpl if="values.removable">' + injectAt + '</tpl>';
            tpls = html.split(injectAt);
            html = tpls.join(injectTpl);

            me.ixMultiSelectItemTpl.set(html, true);
        }
        if (!me.ixMultiSelectItemTpl.isTemplate) {
            me.ixMultiSelectItemTpl = this.lookupTpl('ixMultiSelectItemTpl');
        }
        return me.ixMultiSelectItemTpl.apply(me.valueCollection.getRange());
    },

    ixFavorite: function () {
        iExt.Msg.ixInfo('可以收藏此搜索条件！');
    },

    privates: {

        _ixOnClose: function (item, filters) {
            var me = this;
            if (filters) {
                records = iExt.Filters.ixGetFilterRecords(filters);
                me.store.removeAll(true);
                me.store.add(records);
                me.setValue(me.store.getRange());
                me.fireEvent('ixsearch', me, filters);
            }
            me.collapse();
        }
    }

});