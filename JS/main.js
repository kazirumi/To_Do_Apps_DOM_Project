const MilestonesData = JSON.parse(data).data;


// Load Course mile stones
function LoadMileStones(){
    const milestones = document.querySelector('.milestones');

    milestones.innerHTML = `${MilestonesData.map(function(milestone){
        return `<div class="milestone border-b" id="${milestone._id}">
        <div class="flex">
          <div class="checkbox"><input type="checkbox" onclick="markMilestone(this, ${milestone._id})" /></div>
          <div onClick="openMilestone(this,${milestone._id})">
            <p>
              ${milestone.name}
              <span><i class="fas fa-chevron-down"></i></span>
            </p>
          </div>
        </div>
        <div class="hidden_panel">
        ${milestone.modules.map(function(module){
            return `<div class="module border-b">
              <p>${module.name}</p>
            </div>`
            
        }).join('')}
        </div>
      </div>`


    }).join('')}`;
    

}

const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function(){
  this.style.opacity = 1;
}

LoadMileStones();


function openMilestone(milestoneElement, id){
const currentElement = milestoneElement.parentNode.nextElementSibling;
const shownPanel= document.querySelector(".show");
const activePanel = document.querySelector(".active");

//console.dir(milestoneElement.parentNode.parentNode);

if(!milestoneElement.classList.contains("active") && activePanel)
activePanel.classList.remove("active");

milestoneElement.classList.toggle("active");

if(!currentElement.classList.contains("show") && shownPanel)
shownPanel.classList.remove("show");



currentElement.classList.toggle("show");

showMilestonePicture(id);
}


function showMilestonePicture(id){
  const milestoneImage = document.querySelector(".milestoneImage");
  const title = document.querySelector(".title");
  const details = document.querySelector(".details");



  milestoneImage.style.opacity= "0";
  milestoneImage.src=MilestonesData[id].image;
  title.innerText=MilestonesData[id].name;
  details.innerText= MilestonesData[id].description;
}


function markMilestone(checkboxElment, id){
      const doneList = document.querySelector(".doneList");
      const milestoneList = document.querySelector(".milestones");

      const clickedItem = document.getElementById(id);
      //console.dir(checkboxElment);

      if(checkboxElment.checked){
        // Mark As Done
        milestoneList.removeChild(clickedItem);
        doneList.appendChild(clickedItem);
      }
      else{
        doneList.removeChild(clickedItem);
        milestoneList.appendChild(clickedItem);

        // sort the uncheck courses
        sortUnselectedItem();
      }

}

// sort the uncheck courses 
function sortUnselectedItem(){

   const milstones=document.querySelector(".milestones");
   let MasterMilstones=[...milstones.children].sort((a,b)=>a.id-b.id);
   milstones.innerHTML='';
   MasterMilstones.forEach(node=> milstones.appendChild(node));
   

  
}





