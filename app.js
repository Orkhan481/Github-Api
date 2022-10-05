const githubForm = document.querySelector("#github-form");
const nameInput = document.querySelector("#githubname");
const clearLastUsers = document.querySelector("#clear-last-users");

const lastUsers = document.querySelector("#last-users");
const github = new Github();
const ui = new UI();

addEventListener();

function addEventListener(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}

function getData(e){
     let username = nameInput.value.trim();

     if(username === ""){
        alert("Lutfen gecerli bir kullanici adi giriniz...");
     }
    else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                ui.showError("Kullanıcı bulunamadı...")
                
            }
            else{
                ui.addSearchedUserToUi(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
            
        })
        .catch(err => ui.showError(err));
    }

    ui.clearInput();
    e.preventDefault();
}

function getAllSearched(){
    let users = Storage.getSearchedUsersFromStorage();
    let = result;
    users.forEach(user => {
       result += `<li class="list-group-item">${user}</li>`;
    })

    lastUsers.innerHTML = result;
}

function clearAllSearched(){
    if(confirm("Emin misiniz?")){
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();
    }
}