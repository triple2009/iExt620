/**
 * @class iExt.app.view.window.Base
 * @extends {iExt.window.Window} 
 * @classdesc iExt 视图窗口基础类。
 */
Ext.define('iExt.app.view.window.Base', {
    extend: 'iExt.window.Window',
    alias: 'widget.ixviewwin',

    config: {
        /**
         * 返回的数据
         */
        ixReturn: undefined,

        /**
         * 是否检查脏数据
         */
        ixDirtyCheck: false
    },

    initComponent: function () {
        var me = this;
        me.buttons = me._ixGetButtons();
        me.on('beforeclose', me._ixOnBeforeClose, me);
        me.on('show', me._ixOnShow, me);
        me.callParent(arguments);
    },

    afterRender: function () {
        var me = this;
        me._ixView = me.items.getAt(0);
        me._ixOnAfterRender();
        me.callParent(arguments);
    },

    onDestroy: function () {
        this.callParent();
        Ext.destroyMembers(this, '_ixView');
    },

    privates: {

        _ixOnAfterRender: function () {

        },

        _ixOnShow: function (win, eOpts) {
            // 总是定位在第一个控件上，用户体验？
            //if (win.__ixView) {
            //    win.__ixView.focus();
            //}
        },

        _ixGetButtons: function () {
            return [];
        },

        _ixOnBeforeClose: function () {
            var me = this;
            me._ixOnClose();
            return true;
        },

        _ixOnClose: function () {
            var me = this;
            if (me.hasListeners.ixwinclose) {
                me.fireEvent('ixwinclose', me, Ext.clone(me.getIxReturn()));
            }
        },

        _ixOnOk: function (item, e, eOpts) {
            var me = this;
            me.close();
        },

        _ixOnClear: function (item, e, eOpts) {
            iExt.view.Util.ixClearValues(this);
        },

        _ixOnCancel: function (item, e, eOpts) {
            var me = this;
            me.setIxReturn(null);
            me.close();
        }
    }

});