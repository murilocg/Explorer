var explorer;

function initViewDoc() {
    var url = new URL(window.location.href);
    var idDoc = url.searchParams.get("doc_id");
    searchDoc(idDoc, function(doc){
        var title = document.getElementById("title-paper");
        var bodyPaper = document.getElementById("body-paper");
        if (doc) {
            title.innerHTML = doc.name;
            bodyPaper.innerHTML = doc.content;
        } else {
            title.innerHTML = "Page not found";
            bodyPaper.innerHTML = "Error 404";
        }
    });

}

function initExplorer() {
    folderHome(function (snapshot) {
        var types = createTypes();
        var folder;
        snapshot.forEach(function (child) {
            var r = child.val();
            folder = new Archive(child.key, r.name, null, r.parent, types[0]);
        });
        explorer = new Explorer("explorer", types, folder);
    });
}

function createTypes() {
    var b1 = {
        "open": new Action("open-folder", "Open", null),
        "rename": new Action("rename-folder", "Rename", updateFolder),
        "remove": new Action("remove-folder", "Remove", removeFolder),
        "load": new Action("load-folder", null, childrenFolders)
    };

    var b2 = {
        "open": new Action("open-doc", "View", openDoc),
        "rename": new Action("rename-doc", "Rename", updateDoc),
        "remove": new Action("remove-doc", "Remove", null),
        "load": new Action("load-doc", null, childrenDocuments)
    };

    var types = [
        new TypeOfArchive("Folder", "images/folder.png", b1),
        new TypeOfArchive("Document", "images/doc.png", b2)
                ];

    return types;
}

function openDoc(explorer, document){
    window.location.href = "file:///home/murilo/Explorer/example/view-doc.html?doc_id=" + document.id;
}

function parseFolder(folder, type) {
    return new Archive(folder.key, folder.name, null, folder.parent, type);
}

function parseDocument(doc, type) {
    return new Archive(doc.key, doc.name, null, doc.parent, type);
}
