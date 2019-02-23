

class User {

    constructor(name, email, lastSeen, photoURL, uid, ) {
        this.name = name;
        this.email = email;
        this.lastSeen = lastSeen;
        this.photoURL = photoURL;
        this.uid = uid;
    }

    get name() {
        return this.name;
    }
    set name(name) {
        this.name = name;
    }

    get email() {
        return this.email;
    }
    set email() {
        this.email = email;
    }
    get lastSeen() {
        return this.lastSeen;
    }

    set lastSeen(lastSeen) {
        this.lastSeen = lastSeen;
    }

    get uid() {
        return this.uid;
    }
    set uid(uid) {
        this.uid = uid;
    }


}