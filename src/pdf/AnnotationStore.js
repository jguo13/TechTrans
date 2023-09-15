import { collection, addDoc, setDoc, query, where, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'; // Import Firestore methods
import { db } from '../services/firebase.config';
import { userEmail } from "../App.js"
import { auth } from "../services/firebase.config.js";
/** A minimal local annotation store **/
export default class AnnotationStore {

  constructor() {
    this._annotations = [];
    this.firestoreCollection = collection(db, 'annotations'); // Firestore collection reference
  }

  setAnnotations(annotations) {
    this._annotations = annotations;
  }

  async createAnnotation(annotation) {
    try {
      const user = await auth.currentUser
      console.log(user)
      annotation.pageNumber = annotation.target.selector[1].page
      annotation.body[0].creator.name = user.email
      annotation.body[0].creator.id = user.email
      console.log("here")
      console.log(JSON.stringify(annotation, null, 2));
      // console.log(annotation.pageNumber)
      console.log(annotation.body[0].creator.name)
      // Add the annotation to Firestore
      const docRef = doc(this.firestoreCollection, annotation.id); // Replace 'your_custom_id_here' with the desired custom ID
      // Set the data for the document
      await setDoc(docRef, annotation);
      // const docRef = await addDoc(this.firestoreCollection, annotation);
      // console.log(annotation.id);
      // Get the Firestore document ID and set it in the local annotation
      // annotation.id = docRef.id;
      console.log("hello2");
      console.log(annotation.id);
      // Push the annotation to the local array
      this._annotations.push(annotation);

      console.log('Document added with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document to Firestore: ', error);
    }

    this._annotations.push(annotation);
  }

  async updateAnnotation(updated, previous) {
    // this._annotations = this._annotations.map(a =>
    //   a.id === previous.id ? updated : a);
    try {
      // Update the annotation in Firestore

      const docRef = doc(this.firestoreCollection, previous.id);
      console.log("hello workd");
      console.log(docRef.id)
      await updateDoc(docRef, updated);

      // Update the local annotations array
      this._annotations = this._annotations.map((a) =>
        a.id === previous.id ? { ...updated, id: previous.id } : a
      );

      console.log('Document updated with ID: ', previous.id);
    } catch (error) {
      console.error('Error updating document in Firestore: ', error);
    }
  }

  async deleteAnnotation(annotation) {
    // this._annotations = this._annotations.filter(a =>
    //   a.id !== annotation.id);
    try {
      // Delete the annotation from Firestore
      const docRef = doc(this.firestoreCollection, annotation.id);
      await deleteDoc(docRef);

      // Remove the annotation from the local array
      this._annotations = this._annotations.filter((a) => a.id !== annotation.id);

      console.log('Document deleted with ID: ', annotation.id);
    } catch (error) {
      console.error('Error deleting document in Firestore: ', error);
    }

  }


  async getAnnotations(pageNumber) {

    try {

      // Reference to the "annotations" collection
      const annotationsCollection = await collection(db, 'annotations');
      console.log(pageNumber);
      // Query the Firestore collection for annotations on the specified page
      const querySnapshot = await getDocs(
        query(annotationsCollection, where('pageNumber', '==', pageNumber))
      );

      console.log(querySnapshot);
      const annotationsOnPage = [];


      querySnapshot.forEach((doc) => {
        console.log("in the query");
        // Extract data from the Firestore document
        const annotationData = doc.data();
        for (const field in annotationData) {
          console.log(`${field}: ${annotationData[field]}`);
        }

        annotationsOnPage.push(annotationData);
      });

      // Relations linked to the given annotations
      const ids = new Set(annotationsOnPage.map((a) => a.id));

      // You need to replace `this._annotations` with the actual source of your annotations data
      const linkedRelations = annotationsOnPage
        .filter((a) => !a.target.selector) // all relations
        .filter((a) => {
          const from = a.target[0].id;
          const to = a.target[1].id;
          return ids.has(from) || ids.has(to);
        });
      const m2 = "this is the annotationsOnPage: " + annotationsOnPage;
      return [...annotationsOnPage, ...linkedRelations];

    } catch (error) {
      console.error('Error fetching annotations from Firestore: ', error);
      return [];
    }
  }


  // Example usage:
  // const pageNumber = 1;
  // const firestore = firebase.firestore(); // Initialize Firebase Firestore
  // const annotations = await getAnnotations(pageNumber, firestore);

  // getAnnotations(pageNumber) {

  //   // Text annotations on this page
  //   const isOnPage = annotation => {
  //     if (annotation.target.selector) {
  //       const selectors = Array.isArray(annotation.target.selector) ?
  //         annotation.target.selector : [annotation.target.selector];

  //       const selectorWithPage = selectors.find(s => s.page);
  //       return selectorWithPage?.page == pageNumber;
  //     }
  //   };

  //   const annotationsOnPage = this._annotations.filter(isOnPage);


  //   console.log("here is the old array")
  //   console.log(annotationsOnPage)
  //   // Relations linked to the given annotations
  //   const ids = new Set(annotationsOnPage.map(a => a.id));
  //   const linkedRelations = this._annotations
  //     .filter(a => !a.target.selector) // all relations
  //     .filter(a => {
  //       const from = a.target[0].id;
  //       const to = a.target[1].id;

  //       return ids.has(from) || ids.has(to);
  //     });

  //   return [...annotationsOnPage, ...linkedRelations];
  // }

}