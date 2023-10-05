import React, { useEffect, useState } from "react";
import * as S from "./styles";
// import firebase from "../../services/firebase";
import { auth } from "../../services/firebase.config.js"
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore related functions

function Profile() {

    const [data, setData] = useState([])

    useEffect(() => {
        function catchData() {

            // const user = localStorage.getItem("user")
            // const email = JSON.parse(user)

            // firebase.firestore().collection('users').doc(email).get().then((docRef) => {
            //     const data = docRef.data()
            //     console.log(data)
            //     setData(data)

            // }).catch((error) => { console.log(error) })
            try {
                const user = auth.currentUser;

                if (user) {
                    const email = user.email;
                    const firestore = getFirestore();
                    const emailDocRef = doc(firestore, 'users', email);
                    const docSnapshot = getDoc(emailDocRef);

                    if (docSnapshot.exists()) {
                        const userData = docSnapshot.data();
                        console.log(userData);
                        setData(userData);
                    } else {
                        console.log('User document does not exist.');
                    }
                } else {
                    console.log('User is not logged in.');
                }
            } catch (error) {
                console.error('Error fetching user document:', error);
                toast.error('An error occurred while fetching user data.', {
                    autoClose: 2000,
                    pauseOnHover: false,
                });
            }
        }

        catchData();
    }, []);


    // }
    // catchData()
    //     }, []);

    return (
        <S.Container>
            <S.Icon src="./assets/img/icon-perfil.svg" />
            <p>Profile Informations</p>
            <S.Info>{data.nome}</S.Info>
            <S.Info>{data.email}</S.Info>
            <S.Info>{data.cpf}</S.Info>
            <S.Info>{data.cep}</S.Info>
            <S.Info>{data.cidade}</S.Info>
            <S.Info>{data.bairro}</S.Info>
            <S.Info>{data.rua}</S.Info>


            <S.ContainerLinkHome>
                <S.LinkHome to="/home">
                    Back To <span>Home</span>
                </S.LinkHome>
            </S.ContainerLinkHome>
        </S.Container>
    );
}

export default Profile