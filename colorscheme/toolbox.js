$(document).ready(function() {
  $('#copyCss').zclip({
    path:"../lib/jquery/jquery.zclip.1.1.1/ZeroClipboard.swf"
  , copy: function() {
    var str = "body { background-color: #";
    str += $('#bgcol-selector').val();
    str += "; }\r\n";
    $('.text-item').each(function(index) {
      var c = rgb2hex($(this).css('color'));
      str += ".text-item" + index + " { color: #";
      str += c;
      str += "; }\r\n";
    });
    $('.shape-item').each(function(index) {
      var c = rgb2hex($(this).css('color'));
      str += ".shape-item" + index + " { background-color: #";
      str += c;
      str += "; }\r\n";
    });
    return str;
  }
  , afterCopy: function() {
    $(this).attr({'src':"../images/Tutorial9/paperpencil32_228ef1.png"});
    setTimeout(function() {
      $('#copyCss').attr({'src':"../images/Tutorial9/paperpencil32.png"});
    }, 1000);
  }
  });
});
$('#handleVisible').click(function(){
  $(".editable .ui-resizable-handle").each(function() {
    $(this).css("display", "block");
  });
});

$('#text-item-droppable').draggable({
    cursor: "pointer"
  , containment: "#main-wrapper"
  , helper: 'clone'
  , stop : function(event, ui) {
    var added = add_text_item();
    var offset = added.offset();
    var h = added.height();
    added.css("top", ui.position.top - offset.top - h/2);
    added.css("left", ui.position.left - offset.left);
  }
});

$('.shape-item-droppable').draggable({
    cursor: "pointer"
  , containment: "#main-wrapper"
  , helper: 'clone'
  , stop : function(event, ui) {
    var t = $(this).attr("shape-type");
    var added = add_shape_item(t);
    var offset = added.offset();
    var h = added.height();
    added.css("top", ui.position.top - offset.top - h/2);
    added.css("left", ui.position.left - offset.left);
  }
});

$('#main-wrapper').droppable({
  accept: "#text-item-droppable .shape-item-droppable",
  tolerance: "fit",
});

