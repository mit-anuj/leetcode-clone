import CircleSkeleton from "@/components/Skeleton/CircleSkeleton";
import RectangleSkeleton from "@/components/Skeleton/RectangleSkeleton";
import { auth, firestore } from "@/firebase/firebase";
import { doc, getDoc, runTransaction } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  AiFillDislike,
  AiFillLike,
  AiFillStar,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarburst, TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { toast } from "react-toastify";

const ProblemDescription = ({ problem }) => {
  const user = useAuthState(auth);
  const { currentProblem, loading, problemDifficultyClass, setCurrentProblem } =
    useGetCurrentProblem(problem.id);
  const { liked, disliked, solved, starred, setData } =
    useGetUsersDataOnProblem(problem.id);
  const [updating, setUpdating] = useState(false);

  const returnUserDataAndProblemData = async (transaction) => {
    const userRef = doc(firestore, "users", user[0].uid);
    const problemRef = doc(firestore, "problems", problem.id);
    const userDoc = await transaction.get(userRef);
    const problemDoc = await transaction.get(problemRef);
    return { userDoc, problemDoc, userRef, problemRef };
  };

  const handleLike = async () => {
    if (!user[0]) {
      toast.error("You must be logged in to like the problem", {
        position: "top-center",
        theme: "dark",
      });
      return;
    }
    setUpdating(true);
    // if already liked, if already disLiked , neither
    await runTransaction(firestore, async (transaction) => {
      const { userDoc, problemDoc, problemRef, userRef } =
        await returnUserDataAndProblemData(transaction);
      if (userDoc.exists() && problemDoc.exists()) {
        console.log(liked);
        if (liked) {
          // remove problem id from likedProblems on user document, decrement likes on problem document
          transaction.update(userRef, {
            likedProblems: userDoc
              .data()
              .likedProblems.filter((id) => id !== problem.id),
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes - 1,
          });

          setCurrentProblem((prev) =>
            prev ? { ...prev, likes: prev.likes - 1 } : null
          );
          setData((prev) => ({ ...prev, liked: false }));
        } else if (disliked) {
          transaction.update(userRef, {
            likedProblems: [...userDoc.data().likedProblems, problem.id],
            dislikedProblems: userDoc
              .data()
              .dislikedProblems.filter((id) => id !== problem.id),
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes + 1,
            dislikes: problemDoc.data().dislikes - 1,
          });

          setCurrentProblem((prev) =>
            prev
              ? { ...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1 }
              : null
          );
          setData((prev) => ({ ...prev, liked: true, disliked: false }));
        } else {
          transaction.update(userRef, {
            likedProblems: [...userDoc.data().likedProblems, problem.id],
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes + 1,
          });
          setCurrentProblem((prev) =>
            prev ? { ...prev, likes: prev.likes + 1 } : null
          );
          setData((prev) => ({ ...prev, liked: true }));
        }
      }
      setUpdating(false);
    });
  };

  const handleDislike = async () => {
    if (!user[0]) {
      toast.error("You must be logged in to dislike the problem", {
        position: "top-center",
        theme: "dark",
      });
      return;
    }
    setUpdating(true);
    await runTransaction(firestore, async (transaction) => {
      const { userDoc, problemDoc, problemRef, userRef } =
        await returnUserDataAndProblemData(transaction);
      if (userDoc.exists() && problemDoc.exists()) {
        if (disliked) {
          transaction.update(userRef, {
            dislikedProblems: userDoc
              .data()
              .dislikedProblems.filter((id) => id !== problem.id),
          });
          transaction.update(problemRef, {
            dislikes: problemDoc.data().dislikes - 1,
          });
          setCurrentProblem((prev) => ({ ...prev, dislikes: prev.dislikes - 1 }));
          setData(prev => ({...prev,disliked: false}))
        } else if(liked){
          transaction.update(userRef,{
            dislikedProblems: [...userDoc.data().dislikedProblems,problem.id],
            likedProblems: userDoc.data().likedProblems.filter((id)=> id!==problem.id)
          })
          transaction.update(problemRef,{
            dislikes: problemDoc.data().dislikes + 1,
            likes: problemDoc.data().likes - 1
          })
          setCurrentProblem((prev) => ({ ...prev,dislikes: prev.dislikes + 1,likes: prev.likes - 1}))
        setData(prev =>({...prev,disliked: true,liked: false}) )
        }else{
          transaction.update(userRef,{
            dislikedProblems: [...userDoc.data().dislikedProblems,problem.id]
          })
          transaction.update(problemRef,{
            dislikes: problemDoc.data().dislikes + 1
          })
          setCurrentProblem(prev =>({...prev, dislikes: prev.dislikes + 1}))
          setData(prev => ({...prev,disliked: true}))
        }
      }
      setUpdating(false);
    });
  };

  const handleStar = async()=>{
    if (!user[0]) {
      toast.error("You must be logged in to star the problem", {
        position: "top-center",
        theme: "dark",
      });
      return;
    }
    setUpdating(true);
    await runTransaction(firestore,async(transaction)=>{
      const { userDoc, problemDoc, problemRef, userRef } =
        await returnUserDataAndProblemData(transaction);
      if (userDoc.exists()) {
        if(starred){
          transaction.update(userRef,{
            starredProblems: userDoc.data().starredProblems.filter(id => id !== problem.id)
          })
          setData(prev => ({...prev,starred: false}))
        }else{
          transaction.update(userRef,{
            starredProblems: [...userDoc.data().starredProblems,problem.id]
          })
          setData(prev => ({...prev,starred: true}))
        }
      }
      setUpdating(false)
    })
  }

  return (
    <div className="bg-dark-layer-1">
      {/* TAB */}
      <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
        <div
          className={
            "bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"
          }
        >
          Description
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
        <div className="px-5">
          {/* Problem heading */}
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-white font-medium">
                {problem.title}
              </div>
            </div>

            {!loading && (
              <div className="flex items-center mt-3">
                <div
                  className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
                >
                  {currentProblem.difficulty}
                </div>

                <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
                  <BsCheck2Circle />
                </div>

                <div
                  className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
                  onClick={handleLike}
                >
                  {liked && !updating && (
                    <AiFillLike className="text-dark-blue-s" />
                  )}
                  {!liked && !updating && <AiFillLike />}
                  {updating && (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  )}

                  <span className="text-xs">{currentProblem.likes}</span>
                </div>
                <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6"
                onClick={handleDislike}>
                  {disliked && !updating && (
                    <AiFillDislike className="text-dark-blue-s" />
                  )}
                  {!disliked && !updating && <AiFillDislike />}
                  {updating && (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  )}

                  <span className="text-xs">{currentProblem.dislikes}</span>
                </div>
                <div className="cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 " onClick={handleStar}>
                {starred && !updating && (
                    <TiStarFullOutline className="text-yellow-600" />
                  )}
                  {!starred && !updating && <TiStarOutline />}
                  {updating && (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  )}
                </div>
              </div>
            )}
            {loading && (
              <div className="ml-3 flex space-x-2">
                <RectangleSkeleton />
                <CircleSkeleton />
                <RectangleSkeleton />
                <CircleSkeleton />
              </div>
            )}

            {/* Problem Statement(paragraphs) */}
            <div className="text-white text-sm">
              <div
                dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
              />
              {/* Examples */}
              <div className="mt-4">
                {problem.examples.map((example, index) => (
                  <div key={index}>
                    <p className="font-medium text-white">
                      Example {index + 1}:{" "}
                    </p>
                    {example.img && (
                      <img src={example.img} alt="" className="mt-3" />
                    )}
                    <div className="example-card">
                      <pre>
                        <strong className="text-white">
                          Input: <strong>{example.inputText}</strong>
                        </strong>
                        <br />
                        <strong>Output: </strong>
                        {example.outputText}
                        <br />
                        {example.explaination && (
                          <>
                            <strong>Explaination: </strong>
                            {example.explaination}
                          </>
                        )}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Constraints */}
            <div className="my-5 pb-4">
              <div className="text-white text-sm font-medium">Constraints:</div>
              <ul className="text-white ml-5 list-disc ">
                <div
                  dangerouslySetInnerHTML={{ __html: problem.constraints }}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;

function useGetCurrentProblem(problemId) {
  const [currentProblem, setCurrentProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [problemDifficultyClass, setProblemDifficultyClass] = useState("");

  useEffect(() => {
    const getCurrentProblem = async () => {
      setLoading(true);
      const docRef = doc(firestore, "problems", problemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const problem = docSnap.data();
        // console.log(problem)
        setCurrentProblem({ id: docSnap.id, ...problem });
        setProblemDifficultyClass(
          problem.difficulty === "Easy"
            ? "bg-olive text-olive"
            : problem.difficulty === "Medium"
            ? "bg-dark-yellow text-dark-yellow"
            : "bg-dark-pink text-dark-pink"
        );
      }
      setLoading(false);
    };
    getCurrentProblem();
  }, [problemId]);
  return { currentProblem, loading, problemDifficultyClass, setCurrentProblem };
}

function useGetUsersDataOnProblem(problemId) {
  const [data, setData] = useState({
    liked: false,
    disliked: false,
    starred: false,
    solved: false,
  });
  const user = useAuthState(auth);

  useEffect(() => {
    const getUsersDataOnProblem = async () => {
      const userRef = doc(firestore, "users", user[0].uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        const {
          solvedProblems,
          likedProblems,
          dislikedProblems,
          starredProblems,
        } = data;
        // console.log(likedProblems.includes(problemId))
        setData({
          liked: likedProblems.includes(problemId), // likedProblems["two-sum","jump-game"]
          disliked: dislikedProblems.includes(problemId),
          starred: starredProblems.includes(problemId),
          solved: solvedProblems.includes(problemId),
        });
      }
    };

    if (user[0]) getUsersDataOnProblem();
    // console.log(data)
    return () =>
      setData({ liked: false, disliked: false, starred: false, solved: false });
  }, [problemId, user[0]]);

  return { ...data, setData };
}
