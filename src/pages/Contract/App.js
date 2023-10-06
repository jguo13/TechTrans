import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// import { pdfjs, PDFViewer } from '../src';

import { collection, addDoc, getDocs } from 'firebase/firestore';
import { auth, db } from '../../services/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
// import { pdfjs, PDFViewer } from '@recogito/recogito-react-pdf';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';
import PDFViewer from '../../pdf/PDFViewer';

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

const App = () => {
    console.log("jerrrrrrrrrrr");
    const [annotations, setAnnotations] = useState();
    const [userEmail, setUserEmail] = useState();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("THERE WAS LOGIN");

            if (user) {
                setUserEmail("Test");
                console.log("inner")
                console.log(userEmail);
            } else {
                console.log("outter")
                // User is signed out, update annotations accordingly
                setUserEmail(null);
            }
            console.log(userEmail);
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, [auth]);



    // useEffect(() => {
    //     console.log("STartup")
    //     fetch('sample-annotations.json')
    //         .then(response => response.json())
    //         // .then(setAnnotations);
    //         .then(data => {
    //             // Set the data to the state
    //             setAnnotations(data);

    //             // Now you can log it
    //             console.log(data);

    //             // If you want to create and log m2, you can do it here
    //             const m1 = "test1";
    //             const m2 = m1 + data;
    //             console.log(m2);
    //         })
    // }, []);

    useEffect(() => {
        // Reference to the "annotations" collection in Firestore
        const annotationsCollection = collection(db, 'annotations');

        // Fetch data from Firestore collection
        getDocs(annotationsCollection)
            .then((querySnapshot) => {
                const annotations = [];
                querySnapshot.forEach((doc) => {
                    annotations.push(doc.data());
                });

                // Set annotations in your component state
                setAnnotations;
                const m1 = "new update breg: " + annotations;
                console.log(m1);
            })
            .catch((error) => {
                console.error('Error fetching annotations from Firestore: ', error);
            });
    }, []);
    // ...

    // useEffect(() => {
    //   fetch('sample-annotations.json')
    //     .then(response => response.json())
    //     .then((responseJson) => {
    //       console.log(responseJson);

    //       // Assuming you have a Firestore collection named 'annotations'
    //       const annotationsCollection = collection(db, 'annotations');

    //       // Iterate through the responseJson and add each item to the Firestore collection
    //       responseJson.forEach((data) => {
    //         console.log("Hello, world"); // Added console.log here
    //         addDoc(annotationsCollection, data) // Use addDoc on the collection reference
    //           .then((docRef) => {
    //             console.log('Document added with ID: ', docRef.id);
    //           })
    //           .catch((error) => {
    //             console.error('Error adding document: ', error);
    //           });
    //       });
    //     })
    //     .catch(error => {
    //       console.error('Error fetching data:', error);
    //     });
    // }, []);



    return (
        <>
            <PDFViewer
                mode="scrolling"
                config={{
                    relationVocabulary: ['located_at', 'observed_at']
                }}
                // url="compressed.tracemonkey-pldi-09.pdf"
                url="Bonterms-Professional-Services-Agreement-PSA-Version-1.2.pdf"
                annotations={annotations}
                onCreateAnnotation={a => console.log(JSON.stringify(a))}
                onUpdateAnnotation={(a, b) => console.log(JSON.stringify(a, b))}
                onDeleteAnnotation={a => console.log(JSON.stringify(a))} />

        </>
    )

}

export const userEmail = userEmail;
export default App;
