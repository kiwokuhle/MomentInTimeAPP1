import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare var firebase ;

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  provider = new firebase.auth.GoogleAuthProvider();

  constructor(public http: HttpClient) {
    console.log('Hello DatabaseProvider Provider');
  }



  register(email , password , name){
    var users= firebase.auth().currentUser;

    return new Promise((resolve, reject)=>{
      firebase.auth().createUserWithEmailAndPassword(email , password) .then(()=>{
        firebase.database().ref("user/"+ users.uid).set({
          name:name
        })
        resolve();
      } , (error)=>{
        reject(error);
      });
 
 
 })
 
 }

 login(email , password){

  //firebase.auth().signInWithEmail()
  return new Promise((resolve, reject)=>{
    firebase.auth().signInWithEmailAndPassword(email , password).then(()=>{
      resolve();
    }, Error =>{
      reject(Error)
    }) ;
  
   
})


}

forgetPassword(email){
  return new Promise((resolve, reject)=>{
    firebase.auth().sendPasswordResetEmail(email) ;
    resolve();

})

}

SignWithGoogle(){
  var users= firebase.auth().currentUser;
  this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

   return firebase.auth().signInWithPopup(this.provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
   

      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      var res =result.user.displayName.split(" ")
      console.log(user);

      firebase.database().ref("user/"+ users.uid).set({
        email:user.email ,
        username:user.displayName  ,
        name:{
          first:res[0],
          middle:res[1] ,
          last:res[2]
        }
      })
    
   
    
    
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.d
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

  

}

}
