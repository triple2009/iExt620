/**
 * @class iExt.app.ViewModel
 * @extends {Ext.app.ViewModel} 
 * @classdesc iExt 视图容器ViewModel。
 */
Ext.define('iExt.app.container.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ixviewcontainer',

    data: {
        // 视图容器数据
        _ixvc: {
            title: '',
            ixtitle: ''
        }
    },

    formulas: {

        // 视图容器标题
        _ixvc_title: function (get) {
            return get('_ixvc.title') ||
                get('_ixvc.ixtitle');
        }

    }

});
