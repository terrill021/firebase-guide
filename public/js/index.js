
const stateChaged = user => {
    console.log(user)
    if(!user) {
        initSessionFacebook()
    } else {
        this.usuario = user 
        firebase.database().ref("usuario").push({"hola": "mundo"});
    }
}

const initSession = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
    firebase.auth().signInWithPopup(provider).then((usu) => {
        window.usuario = usu;
    })
    .catch(error => console.log(error))
}

const initSessionFacebook = () => {
    var provider = new firebase.auth.FacebookAuthProvider()
    provider.addScope('public_profile')
    firebase.auth().signInWithPopup(provider).then(usu => window.usuario = usu)
}

const guardarObj = (obj) => {
    firebase.database().ref('usuario').push(obj)
}

const actualizarObj = (obj, uid) => {
    firebase.database().ref('usuario').child(uid).update(obj)
}

const consultar = (uid) => {
    firebase.database().ref('usuario').child('uid').once('value', dato => console.log(dato.val()))
}

const consultarYSuscribir = (uid) => {
    firebase.database().ref('usuario').child('uid').on('value', dato => console.log(dato.val()))
}

const closeSession = () => firebase.auth().signOut()

firebase.auth().onAuthStateChanged(stateChaged)
