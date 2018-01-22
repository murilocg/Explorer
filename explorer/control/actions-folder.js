// abre uma pasta.
function openFolder(explorer, folder) {

    explorer.currentFolder.children = [];
    explorer.currentFolder = folder;
    explorer = reorderBreadCrumb(explorer);

    explorer.types.forEach(function (type, i) {

        type.basicActions.load.execute(explorer, function (result) {
            explorer.currentFolder.children = explorer.currentFolder.children.concat(result);

            if (i == explorer.types.length - 1) {
                explorer.renderer.renderExplorer(explorer);
            }

        });
    });
}

// reorganiza o bread crumb do explorer.
function reorderBreadCrumb(explorer) {

    var i = 0;
    var bc = [];
    while (i < explorer.breadCrumb.length && explorer.breadCrumb[i].parent != explorer.currentFolder.parent) {
        bc.push(explorer.breadCrumb[i]);
        i++;
    }

    bc.push(explorer.currentFolder);
    explorer.breadCrumb = bc;

    return explorer;
}
