import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RiMenuLine } from 'react-icons/ri';
import { MdOutlineLogout } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { auth, db } from "../../services/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { IoClose } from "react-icons/io5";

import {
  Container,
  ContainerHeader,
  Logout,
  Profile,
  ProfileHeader,
  LogoutHeader
} from "./styles";

export function Header({ setMenuIsVisible }) {

  const [nome, setNome] = useState("");
  const [header, setHeader] = useState(true)
  const [mobileHeader, setMobileHeader] = useState(false)


  const history = useHistory();

  async function logout() {
    localStorage.removeItem("user")
    await signOut(auth);
    // await firebase.auth().signOut()
    history.push("/");

  }

  // useEffect(() => {
  //   function catchData() {
  //     const user = localStorage.getItem("user")
  //     const email = JSON.parse(user)

  //     firebase.firestore().collection('users').doc(email).get().then((docRef) => {
  //       const data = docRef.data()
  //       setNome(data.nome)

  //     }).catch((error) => { console.log(error) })


  //   }
  //   catchData()
  // }, []);

  useEffect(() => {
    async function catchData() {
      try {
        const user = auth.currentUser;

        if (user) {
          const email = user.email;
          const emailDocRef = doc(db, 'users', email);
          const docSnapshot = await getDoc(emailDocRef);

          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setNome(data.nome);
          } else {
            console.log('User document does not exist.');
          }
        } else {
          console.log('User is not logged in.');
        }
      } catch (error) {
        console.error('Error fetching user document:', error.message);
      }
    }

    catchData();
  }, [auth]);




  function navigateProfile() {
    history.push('/profile')
  }

  return (
    <>
      {header === true ? (
        <Container>
          <h1>Healthy Food</h1>
          <div>
            <ul>
              <a href="#recipes"><li>HEALTHY RECIPES</li></a>
              <a href="#blog"><li>BLOG</li></a>
              <ProfileHeader onClick={navigateProfile}>{nome}</ProfileHeader>
            </ul>
            <LogoutHeader onClick={logout}><MdOutlineLogout /></LogoutHeader>
          </div>

          <section>
            <RiMenuLine onClick={() => {
              setHeader(false)
              setMobileHeader(true)

            }} className="mobile" />
          </section>

        </Container>) : (
        <ContainerHeader isVisible={mobileHeader}>
          <IoClose size={45} onClick={() => {
            setHeader(true)
            setMobileHeader(false)

          }} />
          <nav>
            <a href="#recipes" onClick={() => {
              setHeader(true)
              setMobileHeader(false)
            }}><li>HEALTHY RECIPES</li></a>
            <a href="#blog"
              onClick={() => {
                setHeader(true)
                setMobileHeader(false)
              }}
            ><li>BLOG</li></a>
            <Profile onClick={navigateProfile}>
              <CgProfile />
              <span>
                {nome}
              </span>
            </Profile>
            <Logout onClick={logout}>
              <MdOutlineLogout />
              <span>
                LOGOUT
              </span>
            </Logout>
          </nav>
        </ContainerHeader>
      )
      }
    </>
  );
}

export default Header
