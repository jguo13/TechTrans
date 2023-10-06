// import React, { useRef } from "react";
// import { useHistory } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import * as S from "./styles";
// import { auth } from "../../services/firebase.config.js"
// // import firebase from "../../services/firebase";

// function Join() {

//   const history = useHistory();
//   const inputEmail = useRef();
//   const inputPassword = useRef();

//   async function login() {
//     const email = inputEmail.current.value;
//     const password = inputPassword.current.value;

//     // try {
//     //   const user = await firebase.auth().signInWithEmailAndPassword(email, password);
//     //   localStorage.setItem("user", JSON.stringify(email))
//     //   history.push("/home");
//     //   return;
//     // } catch {
//     //   toast.error("Invalid email or password!", {
//     //     autoClose: 1000,
//     //     pauseOnHover: false,
//     //   });
//     // }


//     try {

//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       localStorage.setItem("user", JSON.stringify(email));
//       history.push("/home");
//       console.log("done")
//       return;
//     } catch (error) {
//       console.error('Error signing in:', error);
//       toast.error("Invalid email or password!", {
//         autoClose: 1000,
//         pauseOnHover: false,
//       });
//     }
//   }

//   return (
//     <>
//       <S.Container>
//         <S.Img src="./assets/img/illustration_login.svg" />
//         <p>Join</p>

//         <label>
//           <input
//             ref={inputEmail}
//             type="email"
//             placeholder="Email Adress"
//             required
//           />
//         </label>

//         <label>
//           <input
//             ref={inputPassword}
//             type="password"
//             placeholder="Password"
//             required
//           />{" "}
//         </label>

//         <S.Directions>
//           <S.ForgotPassword to="/forgot">Forgot password?</S.ForgotPassword>
//         </S.Directions>

//         <S.DivButtons>
//           <S.ButtonSend onClick={login}>Login</S.ButtonSend>
//         </S.DivButtons>
//         <S.DivRegister>
//           <S.LinkToRegister to="/register">
//             New here? <span>Create an Account</span>
//           </S.LinkToRegister>
//         </S.DivRegister>
//       </S.Container>
//     </>
//   );
// }

// export default Join;


import React, { useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as S from "./styles";
import { auth } from "../../services/firebase.config.js";

function Join() {
  const navigate = useNavigate(); // Use useNavigate for routing
  const inputEmail = useRef();
  const inputPassword = useRef();

  async function login() {
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify(email));
      navigate("/home"); // Use navigate to redirect to "/home"
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("Invalid email or password!", {
        autoClose: 1000,
        pauseOnHover: false,
      });
    }
  }

  return (
    <>
      <S.Container>
        <S.Img src="./assets/img/illustration_login.svg" />
        <p>Join</p>

        <label>
          <input ref={inputEmail} type="email" placeholder="Email Adress" required />
        </label>

        <label>
          <input ref={inputPassword} type="password" placeholder="Password" required />
        </label>

        <S.Directions>
          <S.ForgotPassword to="/forgot">Forgot password?</S.ForgotPassword>
        </S.Directions>

        <S.DivButtons>
          <S.ButtonSend onClick={login}>Login</S.ButtonSend>
        </S.DivButtons>
        <S.DivRegister>
          <S.LinkToRegister to="/register">
            New here? <span>Create an Account</span>
          </S.LinkToRegister>
        </S.DivRegister>
      </S.Container>
    </>
  );
}

export default Join;
