//this div is where profile information will appear
const overview = document.querySelector(".overview");
const username = "landerson1511";
const repoList = document.querySelector(".repo-list");
const reposContainer = document.querySelector(".repos");
const repoData  = document.querySelector(".repo-data");
const backToRepo = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");





const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    gitDisplay(data);
};

gitUserInfo();

const gitDisplay = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
  overview.append(div);
  gitRepoInfo();
};

const gitRepoInfo  = async function () {
    const fetchRepo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const gitRepos = await fetchRepo.json();
    displayRepos(gitRepos);
};

const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);

    }
};

repoList.addEventListener("click", function (e) {
if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    specificRepo(repoName);
}
});

const specificRepo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(`https://api.github.com/repos/landerson1511/github-repo-gallery/languages`);
    const languageData = await fetchLanguages.json();


    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }

    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(div);
    reposContainer.classList.add("hide");
    repoData.classList.remove("hide");
    backToRepo.classList.remove("hide");
};

backToRepo.addEventListener("click", function () {
    reposContainer.classList.remove("hide");
    repoData.classList.add("hide");
    backToRepo.classList.add("hide");

});

filterInput.addEventListener("input", function (e) {
    const captureValue = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const value = captureValue.toLowerCase();

    for (const repo of repos) {
        const repoLower = repo.innerText.toLowerCase();
        if (repoLower.includes(value)) {
            repo.classList.remove("hide");
        } else {repo.classList.add("hide")};
    }
})
