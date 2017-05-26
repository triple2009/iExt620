Ext.define('app.view.user.User', {
    extend: 'iExt.panel.ViewContainer',
    xtype: 'app-user',

    requires: [
        'iExt.toolbar.Indexer',
        'iExt.form.field.TagLabel',
        'iExt.form.field.TagFilter',
        'iExt.meta.Types'
    ],
    controller: 'user',
    viewModel: 'user',

    dockedItems: [{
        xtype: 'ixviewheader',
        items: [{
            xtype: 'ixviewtitle',
            html: '用户',
            flex: 1
        }, {
            xtype: 'ixtagfilter',
            flex: 1,
            store: {
                type: 'ixenumsstore',
                ixEnumType: 'iExt.meta.Types'
            }
        }]
    }, {
        xtype: 'container',
        layout: 'column',
        items: [{
            xtype: 'ixviewheader',
            columnWidth: 0.5,
            items: [{
                text: '新建',
                iconCls: 'x-fa fa-plus',
                listeners: {
                    click: 'onAdd'
                }
            }, {
                text: '编辑',
                iconCls: 'x-fa fa-edit',
                listeners: {
                    click: function () {
                        var win = Ext.create({
                            xtype: 'ixwin',
                            title: {
                                xtype: 'toolbar',
                                items: [{
                                    xtype: 'tbtext',
                                    text: '文本'
                                }, '->', {
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-search',
                                    text: '按钮'
                                }]
                            },
                            width: 600,
                            height: 450
                        });
                        win.show();
                    }
                }
            }, {
                text: '保存',
                iconCls: 'x-fa fa-save',
                listeners: {
                    click: function () {
                        var win = Ext.create({
                            xtype: 'ixwin',
                            title: '常规',
                            modal: true,
                            width: 600,
                            height: 400
                        });
                        win.show();
                    }
                }
            }, {
                text: '取消',
                iconCls: 'x-fa fa-close',
                listeners: {
                    click: function () {
                        Ext.Msg.confirm('系统更新', '系统存在新的版本，是否重新加载？',
                            function (choice) {
                                if (choice === 'yes') {

                                }
                            }
                        );
                    }
                }
            }, '->', {
                text: '操作',
                menuAlign: 'tc-bc',
                menu: {
                    xtype: 'menu',
                    ui: 'ix-view-menu-ui',
                    shadow: false,
                    items: [{
                        text: '启用'
                    }, {
                        text: '停用'
                    }, {
                        text: '审批'
                    }]
                }
            }]
        }, {
            xtype: 'ixviewheader',
            columnWidth: 0.5,
            items: ['->', {
                xtype: 'segmentedbutton',
                items: [{
                    iconCls: 'x-fa fa-line-chart'
                }, {
                    iconCls: 'x-fa fa-calendar'
                }, {
                    iconCls: 'x-fa fa-th-large'
                }, {
                    iconCls: 'x-fa fa-list'
                }]
            }]
        }]
    }],

    items: [{
        xtype: 'app-user-list',
        ixMulti: false,
        listeners: {
            selectionchange: 'onSelectionChange',
            itemdblclick: 'onItemClick'
        }

    }]

});