"use strict";

const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";

class App {
   constructor (){
      this.result = {
         videos: [],
         selectedVideo: null,
         searchTerm: "iPhone X"
      }
   }

   init(){
      this.youtubeSearch("iPhone X");
      this.setup();
   }

   setup(){
      $('#search').keyup(function(e) {
            if(e.which == 13) {
                  $(".root").empty();
                  $('#mainVideo').empty();
                  $('#mainVideo-details').empty();
                  let search = $('#search').val();
                  console.log(search);
                  this.youtubeSearch(search);
            }
      });
   }

   getVideo(video){
      const url = `http://www.youtube.com/embed/${video.id.videoId}`;
      return `<iframe class="embed-responsive-item" src=${url}> </iframe>`;
   }

   getDetails(video){
      const title = video.snippet.title;
      const description = video.snippet.description;
      return ` <h4 class='black-text'>${title}</h4>
                  <p>${description}</p>`;           
    }
   //<iframe className="embed-responsive-item" src={url}> </iframe>
   getVideoList(videos) {
      return videos.map((video, index) => {
            const title = video.snippet.title;
            let titleFit = title;
            titleFit = titleFit.split(' ');
            let titleVideo = titleFit[0]+' '+titleFit[1];
            const description = video.snippet.description;
            const imageUrl = video.snippet.thumbnails.default.url;
            const url = `https://www.youtube.com/embed/${video.id.videoId}`;
            return `<li>
                        <div class='panel panel-default'>
                              <div class="panel-body">
                                    <img class="media-object" src=${imageUrl} />                    
                              </div>
                              <div class="panel-footer">
                                    <p><b>${titleVideo}</b></p>
                              </div>
                        </div>
                  </li>`;
      });
   }

   youtubeSearch(searchTerm) {
      console.log(searchTerm);
      YTSearch({ key: API_KEY, term: searchTerm }, data => {
         console.log("result", data);
         this.result = {
            videos: data,
            selectedVideo: data[0],
            searchTerm: searchTerm
         };
         let list = this.getVideoList(this.result.videos);
         let mainVideo = this.getVideo(this.result.selectedVideo);
         let mainVideoDetails = this.getDetails(this.result.selectedVideo);
         console.log("lis: ", list);
         $(".root").append(list);
         $('#mainVideo').append(mainVideo)
         $('#mainVideo-details').append(mainVideoDetails);
      });
   }

   videoSearch(searchTerm) {
      jQuery.getJSON("list.json", data => {
         console.log("result", data.items);
         this.result = {
            videos: data.items,
            selectedVideo: data.items[0],
            searchTerm: searchTerm
         };
         var list = this.getVideoList(this.result.videos);
         console.log("lis: ", list);
         $(".root").append(list);
      });
   }
};

$(document).ready(()=>{
      let app = new App();
      app.init()},
      $('#carousel').elastislide( {
            minItems : 2
      })
);
