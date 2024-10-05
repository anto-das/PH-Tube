function getTimeString(time){
    // get hour and rest seconds
    const hour =parseInt(time/3600);
    let remingSecond =time % 3600;
    const minute =parseInt(remingSecond/60);
    remingSecond = remingSecond %60;
    return `${hour} hours ${minute}minute ${remingSecond} seconds`
}
let videoViewer = [];
const getSort =(value) =>{
    let removeK =value.split('k');
    let strToNum =parseInt(removeK[0]);
    videoViewer.push(strToNum)
    videoViewer.sort((a,b) => a-b)
    console.log(videoViewer)
    
}

const loadSort = () =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos`)
    .then(res => res.json())
    .then(data => displaySort(data.videos))
    .catch(err => console.log(err))
}

const displaySort =(videos) =>{
    const sortBtn =document.getElementById('sorted');
    const sortedData =videos.sort((a,b) =>{
        const viewsA =parseFloat(a.others.views);
        const viewsB =parseFloat(b.others.views);
        return viewsA - viewsB
    })
    displayVideos(sortedData)
}

const removeActiveClass =() =>{
    const buttons = document.getElementsByClassName('category-btn');
    for(const btn of buttons){
        btn.classList.remove('active')
    }
}
// 1-fetch,load and show categories on html

// create load categories 
const loadCategories =() =>{
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))

}

const loadCategoryVideos = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {
        // sobaike active er class remove korao
        removeActiveClass()
        // id er class ke active korao
        displayVideos(data.category)
        const activeBtn = document.getElementById(`btn${id}`);
        activeBtn.classList.add('active')
    })
    .catch(error => console.log(error))
}

const loadDetails = async(videoId)=>{
    const url=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const response= await fetch(url);
    const data = await response.json();
    displayDetail(data.video)
}
const displayDetail =(video)=>{
    const detailContainer =document.getElementById('modalContent');
    detailContainer.innerHTML =`
    <img class="w-full" src="${video.thumbnail}"/>
    <p class="py-2">${video.description}</p>
    `

    // way-1: 
    // document.getElementById('showModalData').click();
    // way-2:
    document.getElementById('customModal').showModal()
}
// load-videos
const loadVideos =(searchVideo ="") =>{
    // fetch the data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchVideo}`)
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(error => console.log(error))
    
}



const displayVideos =(videos) =>{
    const videoContainer =document.getElementById('videos');
    videoContainer.innerHTML ='';



    if(videos.length == 0){
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML =`
        <div class="min-h-[500px] flex flex-col gap-5 justify-center items-center">
        <img src="assets/icon.png"/>
        <h2 class="text-center text-xl font-bold">
        No Content Here in  this Category
        </h2>
        </div>
        `;
        return;
    }
    else{
        videoContainer.classList.add('grid')
    }
    videos.forEach((video) =>{

        const card =document.createElement('div');
        card.classList='card card-compact';
        card.innerHTML=`
  <figure class="h-[200px] relative">
    <img
      src="${video.thumbnail}" class="h-full w-full object-cover"/>
    ${
        video.others.posted_date?.length ==0 ?"" :`<span class="absolute text-xs bg-black p-1 text-white rounded right-2 bottom-2">${getTimeString(video.others.posted_date)}</span>`
    }
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img class="w-10 h-10 rounded-full" src="${video.authors[0].profile_picture}"/>
    </div>
    <div>
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex gap-3">
    <p class="text-gray-400">${video.authors[0].profile_name}</p>
    ${video.authors[0].verified ===true?`<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>`:''}
    </div>
    <p></p>
    <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">details</button>
    </div>
  </div>
`;
videoContainer.append(card)
    })
}

// create display categories
const displayCategories =(categories)=>{
    const categoriesContainer = document.getElementById('categories');
    categories.forEach((item) =>{
        const btnContainer =document.createElement('div');
       btnContainer.innerHTML=
       `
       <button id="btn${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
       ${item.category}
       </button>
       `
        categoriesContainer.append(btnContainer);
    })
}
document.getElementById('searchInput').addEventListener('keyup',(e)=>{
loadVideos(e.target.value)
})
loadCategories();
loadVideos();