
function build_umarell_section() {

  $.ajax({
    url: "data/levels_and_traits.csv",
    type: "GET",
    dataType: "text",
    success: function(res){
          var levels_and_traits = process_csv(res);
          console.log(levels_and_traits);

          for (var k in levels_and_traits) {
            var str_html_options = ""
            var selected = "selected"
            for (var i = 0; i < levels_and_traits[k].length; i++) {
              str_html_options += '<option value="'+k+"_"+levels_and_traits[k][i]+'" id="'+k+'_'+levels_and_traits[k][i]+'" '+selected+'>'+levels_and_traits[k][i]+'</option>'
              if (selected == "selected") {
                var img_path = "data/traits/"+levels_and_traits[k][i]+".png"
                var img_html = '<div class="umarell-level" id="level_container_'+k+'"><img id="level_img_'+k+'" src="'+img_path+'" alt=""></div>'
                $("#umarell_container").append(img_html);
              }
              selected = "";
            }
            var str_html_select = '<div class="select-lt">'+k+':<select class="form-select" aria-label="'+k+'">'+str_html_options+'</select></div>';
            $("#tl_selectors_container").append(str_html_select);
          }

          build_events();

    }
  });

  function build_events() {
    $(".form-select").change(function(){
      var level = $(this).val().split("_")[0];
      var trait = $(this).val().split("_")[1];
      var img_path = "data/traits/"+trait+".png";
      $("#level_img_"+level).attr("src",img_path);
    });
  }

  function process_csv(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];
    var levels_and_traits = {}

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                //tarr.push(headers[j]+":"+data[j]);
                tarr.push(data[j]);
            }
            lines.push(tarr);
            if (!(tarr[0] in levels_and_traits)){
              levels_and_traits[tarr[0]] = [];
            }
            levels_and_traits[tarr[0]].push(tarr[1]);
        }
    }
    return levels_and_traits;
  }

}
