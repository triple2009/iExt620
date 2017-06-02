/**
 * @class iExt.app.ViewModel
 * @extends {Ext.app.ViewModel} 
 * @classdesc iExt 应用ViewModel。
 */
Ext.define('iExt.app.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ixapp',

    data: {
        /**
         * 应用程序数据
         */
        _ixa: {
            /**
             * 当前用户信息
             */
            user: {
                code: 'Administrator',
                name: '管理员'
            },
            /**
             * 当前应用信息
             */
            app: {
                id: '',
                code: '',
                name: ''
            }
        }
    }

});