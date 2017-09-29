
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ", " + cityStr;
    $greeting.text('So, you want to live at ' + address + '?');
    var streetViewApiKey = "URAPIKEY";
    var imgStr = "";
    imgStr += "https://maps.googleapis.com/maps/api/streetview?";
    imgStr += "size=600x400&";
    imgStr += "location=" + address + "&";
    imgStr += "key=" + streetViewApiKey;

    var htmlStr = "";
    htmlStr += '<img class="bgimg" ';
    htmlStr += 'src="' + imgStr + '">';
    $body.append(htmlStr);

    //NYT AJAX request
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "URAPIKEY",
      'q': cityStr
    });

    $.getJSON( url, function( data ) {
      // console.log(data);
      $nytHeaderElem.text('New York Times Articles About ' + cityStr);
      var items = [];
      $.each( data.response.docs, function( key, val ) {
        items.push( '<li class="article">' +
         '<a href="'+ val.web_url+'">'+val.headline.main + '</a>' +
         '<p>' + val.snippet + '</p>' + "</li>" );
      });
      $nytElem.append(items.join(""));
    })
      .fail(function() {
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded.');
    });

    //Wikipedia AJAX request
    $.ajax( {
        url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search='
            + cityStr +'&prop=revisions&rvprop=content&format=json',
        dataType: 'jsonp'
    } ).done( function ( data ) {
        var wikiArticle = data[1];

        for (var i = 0; i < wikiArticle.length; i++) {
          var articleStr = wikiArticle[i];
          var url = 'https://www.wikipedia.org/wiki/' + articleStr;
          $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
        }

    } );
    return false;
};

$('#form-container').submit(loadData);
