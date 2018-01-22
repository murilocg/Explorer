class RenderExplorer {

    constructor(idDivExplorer) {
        this.divExplorer = document.getElementById(idDivExplorer);
    }

    refreshHeader(explorer) {
        var header = document.getElementById("header-explorer");
        this.divExplorer.replaceChild(this.createHeader(explorer), header);
    }

    refreshBody(explorer) {
        var body = document.getElementById("body-explorer");
        this.divExplorer.replaceChild(this.createBody(explorer), body);
    }

    renderExplorer(explorer) {
        this.divExplorer.innerHTML = "";
        this.divExplorer.appendChild(this.createHeader(explorer));
        this.divExplorer.appendChild(this.createBody(explorer));
    }

    createBody(explorer) {
        var body = document.createElement("div");
        body.className = "body-explorer";
        var table = document.createElement("table");
        if (explorer.currentFolder.children.length == 0) {
            
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            var title = document.createElement("span");
            title.innerHTML = "Empty folder.";
            td.appendChild(title);
            tr.appendChild(td);
            table.appendChild(tr);
            
        } else {
            explorer.currentFolder.children.forEach(function (child, i) {

                var tr = document.createElement("tr");
                tr.id = child.id;

                var td1 = document.createElement("td");
                var img = document.createElement("img");
                img.setAttribute("src", child.type.icon);
                var title = document.createElement("span");
                title.innerHTML = child.name;
                td1.appendChild(img);
                td1.appendChild(title);

                var td2 = document.createElement("td");
                var lastModification = document.createElement("span");
                lastModification.innerHTML = "dd/mm/yy";
                td2.appendChild(lastModification);
                
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.addEventListener("dblclick", function () {
                    explorer.openArchive(child);
                });
                //            tr.addEventListener("contextmenu", openContextMenu(child));
                table.appendChild(tr);
            });
        }
        body.appendChild(table);
        return body;
    }

    // create a header for the explorer.
    createHeader(explorer) {
        var header = document.createElement("div");
        header.className = "header-explorer";
        var divBreadCrumb = document.createElement("div");
        explorer.breadCrumb.forEach(function (el, i) {
            var button = document.createElement("button");
            button.id = "bc-" + el.id;
            button.innerHTML = el.name;
            button.className = "element-bread-crumb";
            button.addEventListener("click", function () {
                explorer.openArchive(el);
            });
            divBreadCrumb.appendChild(button);
        });
        header.appendChild(divBreadCrumb);
        return header;
    }
}
