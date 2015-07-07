$('.picker').colpick({
  layout:'full',
  submit:0,
  colorScheme:'light',
  onChange:function(hsb,hex,rgb,el,bySetColor) {
    $(el).parent().parent().css('background','#'+hex);
    // Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
    if(!bySetColor) {
      $(el).val(hex);
    }
    if( $(el).attr('id') == "bgcol-selector" ) {
      $('#main-wrapper').css('background', '#'+hex);
    }
    if( $(el).attr('id') == "col-selector" ) {
      var index = $("#text-item-select").val();
      $('.text-item').eq(index-1).css('color', '#'+hex);
    }
    if( $(el).attr('id') == "shapecol-selector" ) {
      var index = $("#shape-item-select").val();
      $('.shape-item').eq(index-1).css('background', '#'+hex);
    }
  }
}).keyup(function(){
  $(this).colpickSetColor(this.value);
});
$('.simple-picker').simpleColorPicker({
    colorsPerLine: 8
  , onChangeColor: function(c) {
    var idname = $(this).attr('id').replace(/-simple/g, '');
    $('#' + idname).val(c.replace(/#/, ''));
    $('#' + idname).colpickSetColor(c);
  }
});
//$('.simple-picker').on('keydown', function(e) {
//  $(('.color-picker').hide();
//  var prefix = $(this).attr('id').replace(/-/g, '') + '_';
//  $(('#' + prefix + 'color-picker').hide();
//});
$('.picker-pane').click(function(){
  $(this).find('.picker').trigger("click");
});
