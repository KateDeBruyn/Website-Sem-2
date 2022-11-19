//production nav
const navData = [
    { title: "Home", link: "https://katedebruyn.github.io/Website-Sem-2/index.html"},
    { title: "Blog", link: "https://katedebruyn.github.io/Website-Sem-2/blogs/blog.html"},
    { title: "Data Visualisation", link: "https://katedebruyn.github.io/Website-Sem-2/data/datavisualisation.html"},
    { title: "Data Art", link: "https://katedebruyn.github.io/Website-Sem-2/data/dataart.html"},
    { title: "Design", link: "https://katedebruyn.github.io/Website-Sem-2/design/styleguide.html"},
]

//dev nav
// const navData = [
//     { title: "Home", link: "../index.html"},
//     { title: "Blog", link: "../blogs/blog.html"},
//     { title: "Data Visualisation", link: "../data/datavisualisation.html"},
//     { title: "Data Art", link: "../data/dataart.html"},
//     { title: "Design", link: "../design/styleguide.html"},
// ]

const navigationElement = document.getElementById("navId");

let list = document.createElement("ul");

for(var i = 0; i < navData.length; i++){

    let listItemLink = document.createElement("a");
    listItemLink.innerText = navData[i].title;
    listItemLink.setAttribute("href", navData[i].link);
    
    let listItem = document.createElement("li");
    listItem.appendChild(listItemLink);
    list.appendChild(listItem);
}

navigationElement.appendChild(list);

{/* <nav>
        <input type="checkbox" id="check" />
        <label for="check" class="menu-bars"
          ><i class="fa-solid fa-bars"></i
        ></label>
        <label for="logo" id="logo">keightyrose</label>
        <ul>
          <li><a id="nav-button" href="index.html">Home</a></li>
          <li><a id="nav-button" href="blog.html">Blog</a></li>
          <li>
            <a id="nav-button-data" href="datavisualisation.html">Data V</a>
          </li>
          <li><a id="nav-button" href="dataart.html">Data Art</a></li>
          <li>
            <a id="nav-button" href="styleguide.html">Style Guide</a>
          </li>
        </ul>
      </nav> */}