// import React from "react";
// import { useForm } from "react-hook-form";
// import { useHistory } from "react-router-dom";
// import { yupResolver } from "@hookform/resolvers/yup";

// import * as S from "./styles";

// import * as yup from "yup";
// // import firebase from "../../services/firebase";
// import { toast } from "react-toastify";
// import { auth } from "../../services/firebase.config.js";

// const schema = yup
//   .object({
//     email: yup
//       .string()
//       .email("Please enter a valid email address")
//       .required("Email is required"),
//   })
//   .required();

// function Forgot() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const history = useHistory();

//   async function onSubmit(userData) {

//     const { email } = userData
//     // await firebase
//     //   .auth()
//     //   .sendPasswordResetEmail(email)
//     //   .then(function () {
//     //     toast.success("Check your email!", {
//     //       autoClose: 1000,
//     //       pauseOnHover: false,
//     //     })
//     //     history.push("/");
//     //     return;
//     //   })
//     //   .catch(function (error) {
//     //     toast.error("Did something wrong happen. Try again!", {
//     //       autoClose: 1000,
//     //       pauseOnHover: false,
//     //     });
//     //   })

//     try {
//       await sendPasswordResetEmail(auth, email);

//       // Password reset email sent successfully
//       toast.success('Check your email!', {
//         autoClose: 1000,
//         pauseOnHover: false,
//       });
//       history.push('/');
//     } catch (error) {
//       // Handle any errors that occur
//       console.error('Error sending password reset email:', error);
//       toast.error('Something went wrong. Please try again.', {
//         autoClose: 1000,
//         pauseOnHover: false,
//       });
//     }


//   }

//   return (
//     <>
//       <S.Form onSubmit={handleSubmit(onSubmit)}>

//         <S.Img
//           src="./assets/img/illustration_forgot.svg"
//           alt="A person who does not know the password"
//         />
//         <p>Forgot Password</p>

//         <label>
//           <input
//             className={`input ${errors.email ? "error" : ""}`}
//             type="email"
//             placeholder="Email Adress"
//             {...register("email", { required: true })}
//           />{" "}
//           {errors.email && <span>{errors.email?.message}</span>}
//         </label>

//         <S.DivLogin >
//           <S.LinkToLogin to="/">
//             Back to <span>Login</span>
//           </S.LinkToLogin>
//         </S.DivLogin>

//         <S.DivButtons>
//           <S.ButtonSend type="submit">
//             Recover Password
//           </S.ButtonSend>
//         </S.DivButtons>

//       </S.Form>
//     </>
//   );
// }

// export default Forgot;


import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { yupResolver } from "@hookform/resolvers/yup";
import * as S from "./styles";
import * as yup from "yup";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../services/firebase.config.js"; // Import sendPasswordResetEmail

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
  })
  .required();

function Forgot() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate(); // Use useNavigate for routing

  async function onSubmit(userData) {
    const { email } = userData;

    try {
      await sendPasswordResetEmail(auth, email);

      // Password reset email sent successfully
      toast.success("Check your email!", {
        autoClose: 1000,
        pauseOnHover: false,
      });
      navigate("/"); // Use navigate to redirect to "/"
    } catch (error) {
      // Handle any errors that occur
      console.error("Error sending password reset email:", error);
      toast.error("Something went wrong. Please try again.", {
        autoClose: 1000,
        pauseOnHover: false,
      });
    }
  }

  return (
    <>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Img
          src="./assets/img/illustration_forgot.svg"
          alt="A person who does not know the password"
        />
        <p>Forgot Password</p>

        <label>
          <input
            className={`input ${errors.email ? "error" : ""}`}
            type="email"
            placeholder="Email Adress"
            {...register("email", { required: true })}
          />{" "}
          {errors.email && <span>{errors.email?.message}</span>}
        </label>

        <S.DivLogin>
          <S.LinkToLogin to="/">
            Back to <span>Login</span>
          </S.LinkToLogin>
        </S.DivLogin>

        <S.DivButtons>
          <S.ButtonSend type="submit">Recover Password</S.ButtonSend>
        </S.DivButtons>
      </S.Form>
    </>
  );
}

export default Forgot;
