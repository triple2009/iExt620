/**
 * @class iExt.app.view.model.Workspace
 * @extends {Ext.app.ViewModel} 
 * @classdesc iExt 应用工作区ViewModel。
 * 可以共享该ViewModel的数据
 */
Ext.define('iExt.app.view.model.Workspace', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ixws',

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