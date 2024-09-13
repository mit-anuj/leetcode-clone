import useHasMounted from "@/components/hooks/useHasMounted";
import ProblemTable from "@/components/ProbelmTable/ProblemTable";
import Topbar from "@/components/Topbar/Topbar";
import { auth, firestore } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const user = useAuthState(auth);
  const [loadingProblems,setLoadingProblems] = useState(true);
  const hasMounted = useHasMounted();

  if(!hasMounted) {return null;}
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
    <main className="bg-dark-layer-2 min-h-screen">
      <Topbar problemPage={false} />
      <h1 className="text-2xl text-center text-gray-700 dark:text-gray-400 font-medium uppercase mt-10 mb-5">
        &ldquo; QUALITY OVER QUANTITY &ldquo;
      </h1>
      <div className="relative overflow-x-auto mx-auto px-6 pb-10">
      {loadingProblems &&(
          <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
          {[...Array(10)].map((_,idx)=>(
            <LoadingSkeleton key={idx}/>
          ))}
        </div>
        )}
        
        <table className="text-sm text-left text-gray-500 dark:text-gray-400 ms:w-7/12 w-full max-w-[1200px] mx-auto">
          {!loadingProblems && <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
            <tr>
              <th className="px-1 py-3 w-0 font-medium" scope="col">
                Status
              </th>
              <th className="px-1 py-3 w-0 font-medium" scope="col">
                Title
              </th>
              <th className="px-1 py-3 w-0 font-medium" scope="col">
                Difficulty
              </th>
              <th className="px-1 py-3 w-0 font-medium" scope="col">
                Category
              </th>
              <th className="px-1 py-3 w-0 font-medium" scope="col">
                Solution
              </th>
            </tr>
          </thead>}
          <ProblemTable setLoadingProblems={setLoadingProblems}/>
        </table>
      </div>


{/* //! this form is used to add the problems in the data base(ie Firestore) so added the owner property to display this form*/}
{/* // TODO: add the owner property in the user in database and check if the current user is the owner if yes then show this form and vica versa */}
      {/* <form
        className="p-6 flex flex-col max-w-sm gap-3"
        onSubmit={handleSubmit}
      >
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="problem id"
          name="id"
          value={inputs.id}
          required
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="title"
          name="title"
          value={inputs.title}
          required
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="difficulty"
          name="difficulty"
          value={inputs.difficulty}
          required
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="category"
          name="category"
          value={inputs.category}
          required
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="order"
          name="order"
          value={inputs.order}
          required
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="videoId(optional)"
          name="videoId"
          value={inputs.videoId}
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="link(optional)"
          name="link"
          value={inputs.link}
        />
        <button className="bg-white">Save to firebase</button>
      </form> */}
    </main>
  );
}

const LoadingSkeleton = ()=>{
  return(
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 shrink-0 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32rounded-full bg-dark-layer-1"></div>
      <span className="sr-only">Loading...</span>

    </div>
  )
}
