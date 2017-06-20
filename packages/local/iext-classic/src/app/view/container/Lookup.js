/**
 * @class iExt.app.view.container.Lookup
 * @extends {iExt.app.view.container.Base} 
 * @classdesc 参照视图容器。
 */
Ext.define('iExt.app.view.container.Lookup', {
    extend: 'iExt.app.view.container.Base',
    alias: 'widget.ixlookupcontainer',

    requires: [],

    layout: 'fit',
    title: '参照',
    
    /**
     * 视图类型
     */
    ixViewType: 'lookup',

    /**
     * 设置当前视图
     */
    ixSetView: function () {
        var me = this;
        if (me.__ixCurrentView) {
            if (me.__ixCurrentView.ixIsListView !== true) {
                Ext.raise('指定的视图不是列表视图！');
            }
            me.__ixCurrentView.on('ixselection', me._ixOnSelectionChange, me);
        }
    },

    privates: {

        /**
         * 数据选择变更事件处理
         * 为了统一列表组件，触发自定义的事件
         */
        _ixOnSelectionChange: function (sm, selections) {
            if (this.hasListeners.ixselection) {
                this.fireEvent('ixselection', this, selections);
            }
        }
    }

});