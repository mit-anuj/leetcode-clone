import Dashboard from "@/components/Dashboard/Dashboard";
import useHasMounted from "@/components/hooks/useHasMounted";
import ProblemTable from "@/components/ProbelmTable/ProblemTable";
import Topbar from "@/components/Topbar/Topbar";
import { auth, firestore } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  

  // ! used in the form that is adding the problems in the database.
  // const [inputs, setInputs] = useState({
  //   id: "",
  //   title: "",
  //   difficulty: "",
  //   category: "",
  //   videoId: "",
  //   link: "",
  //   order: 0,
  //   likes: 0,
  //   dislikes: 0,
  // });

  // const handleInputChange = (e) => {
  //   setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // convert input.order to a number
  //   const newProblem = {
  //     ...inputs,
  //     order: Number(inputs.order),
  //   };
  //   try {
  //     await setDoc(doc(firestore, "problems", inputs.id), newProblem);
  //     alert("saved to db");
  //     setInputs({
  //       id: "",
  //       title: "",
  //       difficulty: "",
  //       category: "",
  //       videoId: "",
  //       link: "",
  //       order: 0,
  //       likes: 0,
  //       dislikes: 0,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <Dashboard/>
  );
}


