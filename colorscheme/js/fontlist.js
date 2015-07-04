// http://jabnz.blog69.fc2.com/blog-entry-664.html
function addFontsData(fonts){
  for( i=0; i < fonts.length; i++) {
    var g = $('<optgroup>').css('font-family', fonts[i]).appendTo($("#font-select"));
    g.append($('<option>').html(fonts[i]).val(fonts[i]));
  }
}
$(function() {
  var flash = 0;
  for(i=0;i<navigator.mimeTypes.length;i++){
      if (navigator.mimeTypes[i].suffixes == "swf"){
          flash = 1;
      }
  }
  if(flash) {
    var el = document.createElement("embed");
    el.src = "getFontsList.swf?function=addFontsData";
    el.width = 1;
    el.height = 1;
    el.wmode = "transparent";
    document.body.appendChild(el);
  } else {
    $("#font-select").append($('<option>').html("required flash").val("0"));
    $("#font-select").attr('disabled', true);
  }
});
