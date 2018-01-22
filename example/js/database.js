var config = {
    apiKey: "AIzaSyAnZTBIEmUzSixubXQoib5_a2r1LfK9qXg",
    authDomain: "rota-de-fuga-teste.firebaseapp.com",
    databaseURL: "https://rota-de-fuga-teste.firebaseio.com",
    projectId: "rota-de-fuga-teste",
    storageBucket: "rota-de-fuga-teste.appspot.com",
    messagingSenderId: "63327819122"
};
firebase.initializeApp(config);

function updateFolder(id, folder, callback) {

    var f = {
        name: folder.name,
        parent: folder.parent,
        last_modification: new Date()
    };
    update("/folder/" + folder.id, f, callback);
}

function updateDoc(id, doc, callback) {
    var d = {
        name: doc.name,
        parent: doc.parent,
        last_modification: new Date()
    };
    update("/document/" + doc.id, d, callback);
}

function folderHome(callback) {
    firebase.database().ref("/folder/").orderByChild("parent").equalTo(0).limitToFirst(1).once('value', callback);
}

function removeDocument(doc, callback) {
    remove("/document/" + doc.id, callback);
}

function removeFolder(folder, callback) {
    remove("/folder/" + doc.id, callback);
}

function childrenDocuments(explorer, callback) {
    var parent = parseInt(explorer.currentFolder.id);
    firebase.database().ref("/document/").orderByChild("parent").equalTo(parent).once('value', function (snapshot) {
        var archives = [];
        var type = explorer.types[1];
        snapshot.forEach(function (child) {
            var r = child.val();
            archives.push(new Archive(child.key, r.name, null, r.parent, type));
        });
        callback(archives);
    });
}

function childrenFolders(explorer, callback) {
    var parent = parseInt(explorer.currentFolder.id);
    firebase.database().ref("/folder/").orderByChild("parent").equalTo(parent).once('value', function (snapshot) {
        var archives = [];
        var type = explorer.types[0];
        snapshot.forEach(function (child) {
            var r = child.val();
            archives.push(new Archive(child.key, r.name, null, r.parent, type));
        });
        callback(archives);
    });
}

function searchDoc(idDoc, callback){
    firebase.database().ref("/document/" + idDoc).once('value', function(snapshot){
       var doc = snapshot.val();
        callback(doc);
    });
}

function update(path, data, callback) {
    firebase.database().ref(path).update(data).then(callback);
}

function remove(path, callback) {
    firebase.database().ref(path).remove().then(callback);
}
