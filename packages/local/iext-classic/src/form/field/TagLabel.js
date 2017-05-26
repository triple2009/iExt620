/**
 * @class iExt.form.field.TagLabel
 * @extends {Ext.form.field.Tag} 
 * @classdesc 标签输入项。
 */
Ext.define('iExt.form.field.TagLabel', {
    extend: 'Ext.form.field.Tag',
    alias: 'widget.ixtaglabel',

    cls: 'ix-taglabel',
    hideTrigger: false,
    editable: false,
    selectOnFocus: false,
    triggerCls: 'x-form-search-trigger',

    /*
    tagItemCls: 'ix-taglabel-item',
    tagItemTextCls: 'ix-taglabel-item-text',
    tagItemCloseCls: 'ix-taglabel-item-close',

    tagItemSelector: '.ix-taglabel-item',
    tagItemCloseSelector: '.ix-taglabel-item-close',
    tagSelectedCls: 'ix-taglabel-item-selected',

    triggers: {
        clear: {
            cls: 'x-form-clear-trigger',
            handler: function () {
                this.ixClearTag();
            }
        }
    },
    */

    /**
     * 重载初始化控件。创建标签的数据源，隐藏下拉选择按钮（Trigger）。
     * @memberOf iExt.form.field.TagLabel#
     */
    initComponent: function () {
        var me = this;
        /*
        var store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'memory',
                reader: 'json'
            }
        });
        me.store = store;

        var trigger = me.getTrigger('picker');
        if (trigger) {
            trigger.hide();
        }
        */
        me.callParent(arguments);
    },

    /**
     * 重载点击下拉按钮的事件处理。禁用下拉选择。
     * @memberOf iExt.form.field.TagLabel#
     * @return {Boolean} 返回false，禁用下拉选择。
    onTriggerClick: function () {
        return false;
    },
     */

    /**
     * 重载关闭Tag时触发的处理过程，删除Store中的记录。
     * @memberOf iExt.form.field.TagLabel#
     * @param {Element} itemEl 关闭的标签对象。
     */
    removeByListItemNode: function (itemEl) {
        var me = this,
            rec = me.getRecordByListItemNode(itemEl);

        if (rec) {
            me.store.remove(rec);
        }
        me.callParent(arguments);
    },

    /**
     * 添加标签的方法。
     * @memberOf iExt.form.field.TagLabel#
     * @param {Object} tag 要添加的标签对象。
     */
    ixAddTag: function (tag) {
        var me = this;
        var record = me.getStore().findRecord(me.valueField, tag.value);
        if (!record) {
            me.store.add(tag);
            me.setValue(me.store.getRange());
        }
    },

    /**
     * 删除标签的方法。
     * @memberOf iExt.form.field.TagLabel#
     * @param {Object} tag 要删除的标签对象。
     */
    ixRemoveTag: function (tag) {
        var me = this, value;
        if (Ext.isString(tag)) {
            value = tag;
        } else {
            value = tag.value;
        }
        var record = me.getStore().findRecord(me.valueField, value);
        if (record) {
            me.store.remove(record);
            me.setValue(me.store.getRange());
        }
    },

    /**
     * 清除标签的方法。
     * @memberOf iExt.form.field.TagLabel#
     */
    ixClearTag: function () {
        var me = this, value;
        me.store.removeAll(true);
        me.setValue(me.store.getRange());
    }

});