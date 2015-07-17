$(function(){
    $.contextMenu({
        selector: '.editable',
        zIndex: 10000,
        callback: function(key, options) {
        },
        items: {
            "Delete": {name: "Delete", icon: "delete", callback: function(e, opt) {
              delete_editable(opt.$trigger);
            }},
            "sep1": "---------",
            "Bring to front": {name: "Bring to front" , callback: function(e, opt) {
              bringToFront(opt.$trigger);
            }},
            "Send to back": {name: "Send to back" , callback: function(e, opt) {
              sendToBack(opt.$trigger);
            }}
        }
    });
});
