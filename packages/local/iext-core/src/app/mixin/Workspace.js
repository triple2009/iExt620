/**
 * @mixin iExt.app.mixin.Workspace
 * @classdesc 工作区 MIXIN。
 */
Ext.define('iExt.app.mixin.Workspace', {
    extend: 'iExt.app.mixin.View',

    mixinConfig: {
        id: 'iext-view-ws'
    },

    ixIsWorkspace: true,

    /**
     * 打开视图
     */
    ixOpenView: iExt.unimplFn,

    /**
     * 打开页面
     */
    ixOpenPage: iExt.unimplFn

});