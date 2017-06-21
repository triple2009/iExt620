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

    /**
     * 点击参照事件处理，显示参照窗口。
     * 目前打开的ixwin窗体进行了缓存，以便保留上次的状态
     * 通过为打开视图的组件设置了 _$ixViewId 缓存视图标识
     * 但是带来的问题是缓存的视图谁来销毁？
     * 所以打开缓存视图的组件在销毁时需要检测 _$ixViewId 属性
     * 如果指定的组件存在需要手动销毁。
     */
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
        if (this._$ixViewId){
            var cmp=Ext.getCmp(this._$ixViewId);
            if (cmp){
                cmp.destroy();
            }
        }
        Ext.destroyMembers(this, '__ixCurrentView');
        this.callParent();
    },

    privates: {

        /**
         * 数据选择事件处理，根据选择数据设置值。
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