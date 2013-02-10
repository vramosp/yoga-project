var init = true;
function addVideoToList(video) { 
    var videoData = $('<div>');
    var videoTitle = $('<a>');
    videoTitle.text(video.title).addClass('thumb-title').attr('href');
    var videoAuthor = $('<div>');
    videoAuthor.text('By '+ video.uploader);
    if (video.rating) {
        var videoRating = $('<div>');
        var num = video.rating;
        var n = num.toFixed(2);
        videoRating.text('Rating: '+ n);
    }
    
    var videoDuration = $('<div>');
    var secs = video.duration % 60;
    var min = (video.duration-secs) / 60;
    if (secs < 10) {
        secs = '0'+secs;
    }
    videoDuration.text('Duration: '+ min + ':' + secs);
    videoData.addClass('span2 mleftm5');
    videoData.append(videoTitle);
    videoData.append(videoAuthor);
    if (videoRating) {
        videoData.append(videoRating);
    }
    videoData.append(videoDuration);

    var videoThumbnail = $('<div>');
    var thumbnailUrl = youtube.generateThumbnailUrl(video.id);
    var thumbnailImg = $('<img>');
    thumbnailImg.attr('src', thumbnailUrl);
    videoThumbnail.append(thumbnailImg);
    videoThumbnail.addClass('span2');

    var videoItem = $('<div>');
    videoItem.append(videoThumbnail);
    videoItem.append(videoData);
    videoItem.addClass('row thumb mtop10');
    $('#videos-list').append(videoItem);

    if (init){
        showVideo(videoItem);
        init = false;
    }

    function showVideo(element) {
        var selected = $('.on');
        selected.removeClass('on');
        videoItem.addClass('on');
        var videoTitle = $('<h4>');
        videoTitle.html(video.title + ' <small>' + video.uploader + '</small>');
        var videoEmbed = $('<iframe></iframe>');
        videoEmbed.attr('src', youtube.generateEmbedUrl(video.id));
        videoEmbed.attr('width', 500);
        videoEmbed.attr('height', 315);
        var videoLikes = $('<span>').addClass('social like span1 mtop10');
        if (video.likeCount > 0){
            videoLikes.text('Likes ' + video.likeCount);
        } else {
            videoLikes.text('Likes 0');
        }
       
        var videoViews = $('<span>').addClass('social view span1 mtop10');
        if (video.viewCount > 0){
            videoViews.text('Views ' + video.viewCount);
        } else {
            videoViews.text('Views 0');
        }
        
        var videoComments = $('<span>');
        videoComments.text('Comments ' + video.commentCount).addClass('social comment span1 mtop10');
        
        var videoWatcher = $('#video-watcher');
        videoWatcher.hide();
        videoWatcher.empty();
        videoWatcher.append(videoTitle);
        videoWatcher.append(videoEmbed);
        videoWatcher.append(videoLikes);
        videoWatcher.append(videoViews);
        videoWatcher.append(videoComments);
        videoWatcher.fadeIn();
    }
    videoItem.on('click', function(e){
        e.preventDefault();
        showVideo(videoItem);
    });
 }
function loadVideos(type){
    $.ajax({type: "GET",
    url: "https://gdata.youtube.com/feeds/api/videos?q=yoga+"+ type + "&v=2&alt=jsonc&max-results=30&time=this_week&orderby=viewCount",
    dataType: "json",
    success: function(data) {
        var videos = data['data']['items'];
        var start = Math.ceil(Math.random()*26); /* Pick random number between 1 and 26 */;
        var finish = start + 4;
        for (var i = start; i < finish; i++) {
            addVideoToList(videos[i]);
            }
        }
    });
}