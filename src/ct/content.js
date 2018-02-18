// Global Functions

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined' ?
        args[number] :
        match;
    });
  };
}

function htmlToElement(html) {
  var template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

// Global Vars

var image_elements = document.getElementsByClassName("rg_meta notranslate")
var image_array = [];
var link

// Code

for (var i = 0; i < image_elements.length; i++) {
  image_data = JSON.parse(image_elements[i].innerHTML)
  image_id = image_data['id'].toString()
  image_link = image_data['ou']
  var obj = {};
  obj['id'] = image_id.toString();
  obj['image_link'] = image_link.toString();
  //obj = JSON.stringify(obj);
  image_array.push(obj);
}

// Execution
window.onload = function() { check() } //does initial check if the site already has the image loaded.
document.addEventListener('DOMContentLoaded', check);

// Listen for click events on body
document.body.addEventListener('click', check);

function check() {
  link = window.location.href;
  var starting_index = link.indexOf("imgrc", 0) + 6
  var ending_index = link.length - 2
  var image_id = link.substr(starting_index, ending_index)
  var image_link = image_array.filter(function( obj ) { return obj.id == image_id; })[0].image_link;

  if (image_id == "_") {
    // do something here going forward?
  } else {
    if (image_link != undefined) { // is it even possible for this to be false?
      var parent_content = document.querySelector("div[data-item-id=\"{0}\"]".format(image_id))
      var button_area = parent_content.getElementsByClassName("irc_b i8152 irc_mmc")[0]
      var buttons = button_area.getElementsByClassName("_FKw irc_but_r")[0].childNodes[0].childNodes[0]

      var button_check = buttons.childNodes[1].getAttribute("givi");

      if (!button_check) {
        // add the button
        var parser = new DOMParser();
        var view_image = `<td givi="1"><a class="irc_vil" rel="noopener" jsaction="mousedown:irc.rl;keydown:irc.rlk" target"_blank" tabindex="0" href="${image_link}"><span class="_WKw">View Image</span></a></td>`
        view_image = htmlToElement(view_image)

        buttons.insertBefore(view_image, buttons.childNodes[0].nextSibling)
      }
    }
  }
}
