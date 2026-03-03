const API_URL = "https://api.github.com/repos/MrMacTavish/portfolio-new/commits/main";
const COMMIT_DT_OBJ = document.getElementById("commit-dt");
const COMMIT_MSG_OBJ = document.getElementById("commit-msg");

//Function to get latest commit
function getLatestCommit(){
	console.log("API CALLED");
	fetch(API_URL,{method: "GET"})
        .then((response) => response.json())
        .then((json) => updateCommitTracker(json));
}

//Function to update the sidebar last commit thingy
function updateCommitTracker(json){
	dt = json["commit"]["author"]["date"];
	msg = json["commit"]["message"];
	const ed = new Date();
	ed.setTime(ed.getTime() + (1000 * 60 * 10));
	document.cookie = `gh-commit = ${dt}${msg};expires=${ed.toUTCString()};`;
	COMMIT_DT_OBJ.innerHTML = dt;
	COMMIT_MSG_OBJ.innerHTML = msg;
} 

//Function to update the sidebar last commit thing but from the cached data
function updateCommitTrackerFromCache(res){
	dt = res.substring(0,20);
	msg = res.substring(20);
	COMMIT_DT_OBJ.innerHTML = dt;
	COMMIT_MSG_OBJ.innerHTML = msg;
}

//Check cookie for last refresh time
cookie = document.cookie;
cookieStore.get("gh-commit").then((res)=>{
	if (res == null){ //Cookie doesnt exist
		getLatestCommit();
	} else {
		updateCommitTrackerFromCache(res.value);
	}
})
