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
  if( autoHide )
  {
    $(this).children('img').attr({'src':"../images/ui-handle-icon_228ef1.png"});
    autoHide = false;
    $(".editable .ui-resizable-handle").each(function() {
      $(this).css("display", "block");
    });
  }
  else
  {
    $(this).children('img').attr({'src':"../images/ui-handle-icon_222222.png"});
    autoHide = true;
    $(".editable .ui-resizable-handle").each(function() {
      $(this).css("display", "none");
    });
  }
});

$('#text-item-droppable').draggable({
    cursor: "pointer"
  , containment: "#main-wrapper"
  , helper: 'clone'
  , stop : function(event, ui) {
    var added = add_text_item();
    var pos = getItemPosition(added, ui.position);
    added.css("top", pos.top);
    added.css("left", pos.left);
  }
});

$('.shape-item-droppable').draggable({
    cursor: "pointer"
  , containment: "#main-wrapper"
  , helper: 'clone'
  , stop : function(event, ui) {
    var t = $(this).attr("shape-type");
    var added = add_shape_item(t);
    var pos = getItemPosition(added, ui.position);
    added.css("top", pos.top);
    added.css("left", pos.left);
  }
});

$('#main-wrapper').droppable({
  accept: "#text-item-droppable .shape-item-droppable",
  tolerance: "fit",
});

