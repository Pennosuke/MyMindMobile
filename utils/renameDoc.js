import firebase from '../constants/firebase';
import 'firebase/firestore';
import { db } from '../constants/firebase'

db.collection("userData").doc("IlQ1Ywim9pRGLlv5lrcmQwSJWp42").get().then(function (doc) {
  if (doc && doc.exists) {
    var data = doc.data();
    var newDocName = doc.data().userName;
    db.collection("userData").doc(newDocName).set(data).then(
      db.collection("userData").doc("IlQ1Ywim9pRGLlv5lrcmQwSJWp42").delete()
    );
  }
});