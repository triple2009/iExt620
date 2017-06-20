/**
 * @class iExt.form.field.LookupField
 * @extends {Ext.form.field.Picker}
 * @classdesc iExt 参照文本框。
 */
Ext.define('iExt.form.field.LookupField', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.ixlookupfield',

    cls: 'ix-lookup-field',

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
         * 是否复选
         */
        ixMulti: false,
        /**
         * 值属性名称
         */
        ixValueField: '',
        /**
         * 显示属性集合
         * {Object[]}: [{dataIndex:'', ref:''},{...}]
         */
        ixDisplayFields: []
    },

    ixDelimiter: ',',

    initComponent: function () {
        var me = this;
        if (me.readOnly !== true) {
            var triggers = {
                lookup: {
                    cls: 'x-fa fa-ellipsis-h',
                    handler: me.ixOnLookup.bind(me)
                }
            };
            me.setTriggers(triggers);
        }
        me.callParent(arguments);
    },

    ixOnLookup: function (field, trigger, e) {
        var me = this,
            view = me.getIxView(),
            multi = me.getIxMulti(),
            scale = me.getIxScale();
        if (view) {
            view = iExt.View.ixGetView(view, {
                ixMulti: multi,
                header: false
            });
            var target = iExt.action.ViewTarget.IXWIN;
            me.fireEvent('ixopenview', me, view, {
                target: target,
                formType: 'lookup',
                scale: scale,
                fn: me._ixOnSelection
            });
        }
        e.stopPropagation();
    },

    /**
     * 销毁处理，清除缓存的视图
     */
    onDestroy: function () {
        if (this.ixViewId){
            var cmp=Ext.getCmp(this.ixViewId);
            if (cmp){
                cmp.destroy();
            }
        }
        Ext.destroyMembers(this, '__ixCurrentView');
        this.callParent();
    },

    privates: {

        /**
         * 数据选择事件处理
         */
        _ixOnSelection: function (item, records) {
            if (!records || !Ext.isArray(records)) {
                return;
            }
            if (records.length === 0) {
                return;
            }
            var me = this,
                valueField = me.getIxValueField(),
                displayFields = me.getIxDisplayFields() || [],
                multi = me.getIxMulti();

            // 设置显示属性值
            var refHoder = me.lookupReferenceHolder(true);
            //<debug>
            if (!refHoder) {
                Ext.raise('未找到 ReferenceHolder ！');
                return;
            }
            //</debug>
            var refs = refHoder.getReferences();

            var val = '';
            if (multi === false) {
                var record = records[0];
                val = record.get(valueField);
                me.setValue(val);
                iExt.util.View.ixSetDisplayValue(record, displayFields, refs);
            } else {
                Ext.each(records, function (record) {
                    val += record.get(valueField) + me.ixDelimiter;
                });
                val = val.substr(0, val.length - me.ixDelimiter.length);
                me.setValue(val);
                iExt.util.View.ixSetDisplayValues(records,
                    displayFields, refs, me.ixDelimiter);
            }
        }
    }
});