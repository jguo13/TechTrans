import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { pdfjs, PDFViewer } from '../src';
import Todo from '../src/components/Todo';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../src/services/firebase.config';
import { auth } from "../src/services/firebase.config.js";
import { onAuthStateChanged } from 'firebase/auth';
import App from '../src/App.js';


pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

// const App = () => {

//   const [annotations, setAnnotations] = useState();
//   const [userEmail, setUserEmail] = useState();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       console.log("THERE WAS LOGIN");

//       if (user) {
//         setUserEmail(user.email);

//       } else {
//         // User is signed out, update annotations accordingly
//         setUserEmail(null);
//       }
//     });


//     // Clean up the listener when the component unmounts
//     return () => unsubscribe();
//   }, [auth]);
//   // useEffect(() => {
//   //   fetch('sample-annotations.json')
//   //     .then(response => response.json())
//   //     .then(setAnnotations);
//   // }, []);

//   useEffect(() => {
//     // Reference to the "annotations" collection in Firestore
//     const annotationsCollection = collection(db, 'annotations');

//     // Fetch data from Firestore collection
//     getDocs(annotationsCollection)
//       .then((querySnapshot) => {
//         const annotations = [];
//         querySnapshot.forEach((doc) => {
//           annotations.push(doc.data());
//         });

//         // Set annotations in your component state
//         setAnnotations(annotations);
//         console.log("new update breg");
//         console.log(annotations)
//       })
//       .catch((error) => {
//         console.error('Error fetching annotations from Firestore: ', error);
//       });
//   }, []);
//   // ...

//   // useEffect(() => {
//   //   fetch('sample-annotations.json')
//   //     .then(response => response.json())
//   //     .then((responseJson) => {
//   //       console.log(responseJson);

//   //       // Assuming you have a Firestore collection named 'annotations'
//   //       const annotationsCollection = collection(db, 'annotations');

//   //       // Iterate through the responseJson and add each item to the Firestore collection
//   //       responseJson.forEach((data) => {
//   //         console.log("Hello, world"); // Added console.log here
//   //         addDoc(annotationsCollection, data) // Use addDoc on the collection reference
//   //           .then((docRef) => {
//   //             console.log('Document added with ID: ', docRef.id);
//   //           })
//   //           .catch((error) => {
//   //             console.error('Error adding document: ', error);
//   //           });
//   //       });
//   //     })
//   //     .catch(error => {
//   //       console.error('Error fetching data:', error);
//   //     });
//   // }, []);



//   return (
//     <>
//       <PDFViewer
//         mode="scrolling"
//         config={{
//           relationVocabulary: ['located_at', 'observed_at']
//         }}
//         url="compressed.tracemonkey-pldi-09.pdf"
//         annotations={annotations}
//         onCreateAnnotation={a => console.log(JSON.stringify(a))}
//         onUpdateAnnotation={(a, b) => console.log(JSON.stringify(a, b))}
//         onDeleteAnnotation={a => console.log(JSON.stringify(a))} />

//     </>
//   )

// }

window.onload = function () {

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );

}

