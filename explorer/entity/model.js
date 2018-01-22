class TypeOfArchive {
    constructor(name, icon, basicActions, extraActions) {
        this.name = name;
        this.icon = icon;
        this.basicActions = basicActions;
        this.extraActions = extraActions;
    }
}

class Action {
    constructor(id, name, execute) {
        this.id = id;
        this.name = name;
        this.execute = execute;
    }
}

class Archive {
    constructor(id, name, lastModification, parent, type) {
        this.name = name;
        this.lastModification = lastModification;
        this.parent = parent;
        this.type = type;
        this.id = id;
        this.children = [];
    }
}

class Explorer {

    constructor(idDivExplorer, types, folderHome) {
        this.types = types;
        this.breadCrumb = [];
        this.renderer = new RenderExplorer(idDivExplorer);
        this.currentFolder = folderHome;
        this.types[0].basicActions.open.execute = openFolder;
        this.openArchive(folderHome);
    }

    // action to open any type of archive.
    openArchive(archive) {
        var action = archive.type.basicActions.open;
        if(action && action.execute){
            action.execute(this, archive);
        }
    }

    // action to rename any type of archive.
    rename(archive) {

    }

    // action to remove any type of archive. This method must open a 
    // confirm dialog with a event listener to execute the action of rename.
    remove(archive) {

    }

    // this methods execute extra actions.
    extra(archive, action) {

    }
}
