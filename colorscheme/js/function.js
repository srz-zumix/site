function onResize() {
  $('#main-wrapper').height($(window).height() - 50);
}

$(window).resize(function() {
  onResize();
});

function getItemPosition(item, drop_pos)
{
  var offset = item.offset();
  var h = item.height();
  if( item.css("position") == "absolute" )
  {
    return { top: drop_pos.top - h/2, left: drop_pos.left };
  }
  else
  {
    return { top: drop_pos.top - offset.top - h/2, left: drop_pos.left - offset.left };
  }
}

function onSelectByCombo(item) {
  $(item).children('.selectable').focus();
  //blinkBorder(item);
}

function blinkBorder(item) {
  var cnt = 0;
  $(item).addClass('editing');
  var timer = setInterval(function () {
      cnt++
      $(item).toggleClass('editing');
      if (cnt == 3) {
          clearInterval(timer);
      }
  }, 400);
}

function rgb2hex(rgb) {
  if( rgb ) {
    var ret = eval(rgb.replace(/rgb/,"((").replace(/,/ig,")*256+")).toString(16); 
    return (("000000" + ret).substring( 6 + ret.length - 6));
  } else {
    return "000000";
  }
}
function select_text_item(item) {
  var i = $(".text-item").index($(item));
  $("#text-item-select").val(i+1);
  var c = rgb2hex($(item).css('color'));
  $("#col-selector").val(c);
  $("#col-selector").colpickSetColor('#' + c);
  
  var s = $(item).css('font-size');
  $("#size-text").val(s);

  var w = $(item).css('font-weight');
  $("input#weight-text").val(w);
  $("select#weight-text").val(w);
}
function select_shape_item(item) {
  var i = $(".shape-item").index($(item));
  $("#shape-item-select").val(i+1);
  var c = rgb2hex($(item).css('background-color'));
  $("#shapecol-selector").val(c);
  $("#shapecol-selector").colpickSetColor('#' + c);
  if( $(item).hasClass("circle-item") ) {
    $("#shape-type").text("circle");
  } else {
    $("#shape-type").text("square");
  }
}

function delete_editable(item) {
  $(item).remove();
  if( $(item).hasClass("text-item") ) {
      $("select#text-item-select").children('option:last-child').remove();
      select_text_item($(".text-item").eq(0));
  } else if( $(item).hasClass("text-item") ) {
      $("select#shape-item-select").children('option:last-child').remove();
      select_shape_item($(".shape-item").eq(0));
  }
}
var prevSizeH = 0;
var autoHide=true;

function update_auto_hide(item)
{
  if( !autoHide )
  {
    $(item).children(".ui-resizable-handle").each(function() {
      $(this).css("display", "block");
    });
  }
}

function update_ediable() {
  $( ".editable" ).resizable({
      containment: "#main-wrapper"
    , autoHide : true
    , minWidth : 40
    , minHeight: 40
    , start: function(event, ui) {
      $(this).addClass("editing");
      prevSizeH = ui.originalSize.height;
    }
    , resize: function(event, ui) {
      if( $(this).css("position") == "absolute" ) return;
      $(this).css("left", ui.originalPosition.left);
      $(this).css("top", ui.originalPosition.top);

      var diff = prevSizeH - ui.size.height;
      prevSizeH = ui.size.height;
      var index = $(".editable").index(this);
      $(".editable:" + "gt(" + index + ")").each(function() {
        var top = $(this).css("top");
        if( top.indexOf("auto") == 0 )
        {
          top = diff;
        }
        else
        {
          top = parseInt(top.replace(/px$/, ''));
          top += diff;
        }
        $(this).css("top", top);
      });
    }
    , stop: function(event, ui) {
      $(this).removeClass("editing");
    }
  }).draggable({
      cursor: "move"
    , containment: "parent"
    , refreshPositions: true
    , start: function(event, ui) {
      $(this).addClass("editing");
      $('#garbageCan').children('img').attr({'src':"../images/Tutorial9/recycle32_228ef1.png"});
    }
    , stop: function(event, ui) {
      $(this).removeClass("editing");
      $('#garbageCan').children('img').attr({'src':"../images/Tutorial9/recycle32.png"});
    }
  }).hammer().on('doubletap',function(e){
    $(this).children(".ui-resizable-handle").each(function() {
      $(this).css("display", "block");
    });
    $(this).find('p').focus();
  }).on('mouseout', function() {
    update_auto_hide($(this));
  }).on('mousedown', function () {
    $(this).children('.selectable').focus();
  }).on('keydown', function(e) {
    if( $(this).children('.selectable').is(':focus') ) {
      if(e.keyCode == 46) {
        delete_editable($(this));
      }
    }
  });
  
  $( ".text-item").on('mousedown', function () {
    select_text_item(this);
  }).on('click', function() {
    $(this).draggable({ disabled: false });
  }).on('dblclick', function() {
    $(this).draggable({ disabled: true });
    $(this).find('p').focus();
  });
  $( ".shape-item").on('mousedown', function () {
    select_shape_item(this);
  });
  
  $("#garbageCan").droppable({
    activeClass: "dragaccept",
    hoverClass: "dragover",
    tolerance: "pointer",
    drop: function(event, ui) {
      $('body').css('cursor', 'auto');
      delete_editable($(ui.draggable));
    }
  });
}
function putRandom(added) {
  var offset = $('#main-wrapper').offset();
  var h = $('#main-wrapper').height();
  var w = $('#main-wrapper').width() - added.width();
  x = Math.round( Math.random()*w );
  y = Math.round( Math.random()*(h-added.height()) );
  pos = getItemPosition(added, {top: offset.top + y, left: offset.left+x});
  added.css("left", pos.left);
  added.css("top", pos.top);
}

function on_added(item) {
  update_auto_hide(item);
  item.children('.selectable').attr('tabindex', '0');
}

function get_current_text() {
  var index = $("#text-item-select").val();
  return $(".text-item").eq(index-1).find('p').html();
}
function add_text_item() {
  var c = "#000";
  var t = "Drag me around<br />Edit by double click";
  if( $(".text-item").size() > 0 ) {
    c = "#" + $("#col-selector").val();
    t = get_current_text();
  }
  $('#main-wrapper').append("<div class=\"text-item editable\" style=\"color: " + c + ";\" ><div class=\"selectable\"><p contenteditable=\"true\">" + t + "</p></div></div>");
  var index = $(".text-item").size()
  $("#text-item-select").append($('<option>').html(index).val(index));
  update_ediable();
  var added = $(".text-item").eq(index-1);
  select_text_item(added);
  on_added(added);
  return added;
}
function add_shape_item(type_name) {
  var c = "#FF0";
  if( $(".shape-item").size() > 0 ) {
    c = "#" + $("#shapecol-selector").val();
  }
  $('#main-wrapper').append("<div class=\"shape-item editable " + type_name + "-item\" style=\"background-color:" + c + ";\" ><div class=\"selectable\"></div></div>");
  var index = $(".shape-item").size()
  $("#shape-item-select").append($('<option>').html(index).val(index));
  var added = $(".shape-item").eq(index-1);
  update_ediable();
  select_shape_item(added);
  on_added(added);
  return added;
}
$(function () {
  onResize();
  add_text_item();
  add_shape_item();
  
  var c = rgb2hex($("#main-wrapper").css('background-color'));
  $("#bgcol-selector").val(c);
  $("#bgcol-selector").colpickSetColor('#' + c);
});
