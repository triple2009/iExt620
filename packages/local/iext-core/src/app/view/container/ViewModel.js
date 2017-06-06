/**
 * @class iExt.app.view.container.ViewModel
 * @extends {Ext.app.ViewModel} 
 * @classdesc iExt 视图容器ViewModel。
 */
Ext.define('iExt.app.container.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ixviewcontainer',

    data: {
        /**
         * 视图容器数据
         */
        _ixvc: {
            /**
             * 标题
             */
            title: '',

            /**
             * 缺省标题
             */
            defaultTitle: ''
        }
    },

    formulas: {

        /**
         * 视图容器标题。
         * 如果指定了标题则使用该标题，否则使用缺省标题。
         */
        _ixvcTitle: function (get) {
            return get('_ixvc.title') ||
                get('_ixvc.defaultTitle');
        }

    }

});