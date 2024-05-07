/* Main Working Code. */
var userData = []
var genreSeeds = []
var recommendationList = []
$(() => {
    $("#content-container").hide()
})
async function APICall (query,outputlist,callback){
    console.warn(`CALLING:https://api.spotify.com/v1/${query}, AND PUSHING TO ${toString(outputlist)}`);
    fetch(
      `https://api.spotify.com/v1/${query}`,
      {
        headers: new Headers({
          Authorization: "Bearer " + access_token,
        }),
        method: "GET",
      }
    )
      .then(function (response) {
        apiresponseCode=response.status;
        if (response.status === 401) { //If response is good
          window.open(url,"_self");
        }
        if (response.ok) {
          return response.json();
        } else { //If response is bad
          return Promise.reject(response);
        }
      })
      .then(function (data) {
        outputlist.push(data);
      })
      .catch(function (err) {
        console.warn("Something went wrong.", err);
      }).then(()=>{
        callback();
      })
  }

windowHref = window.location.href
access_token = windowHref.substring(36,247)

$("#disable-crt").on("click", () => {
    console.info("Disabling Effects!")
    $("#content-warning").empty()
    $("#content-warning").append("<h1>This is NOT reccomended! Proceeding in 5 seconds...</h1>")
    setTimeout(() => {
        $("#content-warning").remove()
        $("#content-container").removeClass("crt").delay(100).show()
    }, 5000)
})
$("#enable-crt").on("click", () => {
    console.info("Enabling Effects!")
    $("#content-warning").remove()
    $("#content-container").fadeIn(1000)
    parseUserData()
    cmd_send.focus()
})

 //Yes, implicit flow has security flaws, but as of now, this cannot be deployed on a dedicated page with support for node.js
    const client_id = "f135f198ca47420798b0f69e7bcca32f"
    const redirect_uri = "http://127.0.0.1:5500/"

    let state = generateRandomString(16);
    localStorage.setItem("stateKey", state)

    var scope = 'user-read-private user-read-email';

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

$("#login-btn").attr('href',url)

async function parseUserData(){
    await APICall("me",userData,()=>{
        typeWriter("welcome-msg",50,`Welcome back, ${userData[0].display_name}. To get recommendations, please type in a genre. To get a list of genres, please type "list genres"`)
    })
    await APICall("recommendations/available-genre-seeds",genreSeeds,()=>{})
    main()
    return
}

async function main(data1, data2){
    $("#cmd-send").on("keypress",function(event){
        if(event.originalEvent.isTrusted){
            if(event.code==="Enter"){
                console.info(`main() working...`)
                var inputText = $("#cmd-send").val()
                if(inputText.toLowerCase()==="yes"){ //to override below function.
                    console.warn("Warning overriden!")
                    $(".warning-msg").remove()
                    for(let x=0;x<genreSeeds[0].genres.length;x++){
                        $(`<h5 id="genere-${x}" class="genre-list">${genreSeeds[0].genres[x]}</h5>`).appendTo("#main-content")
                    }
                }
                else if(inputText.toLowerCase()==="list genres"){
                    console.log("list genres!")
                    if(genreSeeds[0].genres.length>50){
                        console.warn(`Genre seeds exceeds 50. ${genreSeeds[0].genres.length}`)
                        $(`<h5 class="warning-msg">Genre seeds exceeds 50, continue? (This could cause issues.)</h5>`).prependTo("#main-content")
                        
                    }
                }
                else{
                    APICall(`search?q=genre%${inputText}&type=album`,recommendationList,()=>{})
                    console.log(recommendationList)
                }
                $("#cmd-send").val("")
            }
        }
    })
}