
$(document).ready(function(){
	//alert('hi');
	//$.post("")
	var KEY = '77551126ef7c778ed97b4816b8b95377';
	var flickr = new Flickr({
		api_key: KEY
	});
	var galleryurl = "http://www.flickr.com/photos/kcm76/galleries/72157622724951927/";
	$.post("http://api.flickr.com/services/rest/?method=flickr.urls.lookupGallery&api_key="+KEY+"&url="+galleryurl+"&format=json&nojsoncallback=1",function(data,status){
	if(status == "success"){
			$.post("http://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key="+KEY+"&gallery_id="+data.gallery.id+"&format=json&nojsoncallback=1",function(data1){
				for(i=0;i<data1.photos.photo.length;i++){				
					$.post("http://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key="+KEY+"&photo_id="+data1.photos.photo[i].id+"&format=json&nojsoncallback=1",function(data2){
						console.log(data2.photo.urls.url[0]._content+"sizes/o/in/photostream/");					
						/*$.post(data2.photo.urls.url[0]._content+"sizes/o/in/photostream/",function(data3){
							
						});*/
					});
				}				
			});
		}
	});
});

// Running a post request in nodejs
//