
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
    var apiKey = "YOUR_API_KEY";
    var imgStr = "";
    imgStr += "https://maps.googleapis.com/maps/api/streetview?";
    imgStr += "size=600x400&";
    imgStr += "location=" + address + "&";
    imgStr += "key=" + apiKey;

    var htmlStr = "";
    htmlStr += '<img class="bgimg" ';
    htmlStr += 'src="' + imgStr + '">';
    $body.append(htmlStr);
    return false;
};

$('#form-container').submit(loadData);
