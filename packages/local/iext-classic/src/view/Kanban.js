/**
 * @class iExt.view.Kanban
 * @extends {Ext.view.View} 
 * @classdesc 应用程序列表。
 */
Ext.define('iExt.view.Kanban', {
    extend: 'Ext.view.View',
    alias: 'widget.ixkanbanview',

    cls: 'ix-kaban-view',
    width: 750,
    trackOver: true,
    itemSelector: 'div.ix-kanban-item',
    overItemCls: 'ix-kanban-item-over',
    selectedItemCls: 'ix-kanban-item-selected',

    tpl: [
        '<tpl for=".">',
        '<div class="ix-kanban-item">',
        '<img class="ix-kanban-thumb" src="{thumb}" />',
        '<h3>{name}</h3>',
        '</div>',
        '</tpl>'
    ]

});