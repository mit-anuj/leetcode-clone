import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { useEffect, useState } from "react";
import { auth, firestore } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { problems } from "@/utils/problems";
import { useRouter } from "next/router";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
const Playground = ({ problem, setSuccess,setSolved }) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState(0);
  let [userCode, setUserCode] = useState(problem.starterCode);
  const user = useAuthState(auth);
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const handleSubmit = async () => {
    if (!user[0]) {
      toast.error("please login first", {
        position: "top-center",
        theme: "dark",
        autoClose: 3000,
      });
      return;
    }
    try {
      userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName))
      const cb = new Function(`return ${userCode}`)();
      const success = problems[pid].handlerFunction(cb);
      if (success) {
        toast.success("Congrats! All test passed", {
          position: "top-center",
          theme: "dark",
          autoClose: 3000,
        });
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 4000);
        const userRef = doc(firestore,'users',user[0].uid);
        await updateDoc(userRef,{
          solvedProblems:arrayUnion(pid),
        })
        setSolved(true);
      }
    } catch (error) {
      if (
        error.message.startsWith(
          "Error: AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:"
        )
      ) {
        toast.error("Oops! one or more test cases failed", {
          position: "top-center",
          theme: "dark",
          autoClose: 3000,
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
          theme: "dark",
          autoClose: 3000,
        });
      }
    }
  };


  useEffect(()=>{
    const code = localStorage.getItem(`code-${pid}`)
    if(user[0]){
      setUserCode(code?JSON.parse(code):problem.starterCode)
    }else{
      setUserCode(problem.starterCode)
    }
  },[pid,user[0],problem.starterCode])
  const onChange = (value) => {
    setUserCode(value);
    localStorage.setItem(`code-${pid}`,JSON.stringify(value))
  };
  return (
    <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">
      <PreferenceNav />

      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value={userCode}
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
            onChange={onChange}
          />
        </div>
        <div className="w-full px-5 overflow-auto">
          {/* test case headings */}
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">
                Test Cases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded border-none bg-white" />
            </div>
          </div>
          <div className="flex">
            {/* test cases */}
            {problem.examples.map((testCases, index) => (
              <div
                className="mr-2 items-start mt-2 text-white"
                key={testCases.id}
              >
                <div className="flex flex-wrap items-center gap-y-4">
                  <div
                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3
                    hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap ${
                      activeTestCaseId === index
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                    onClick={() => setActiveTestCaseId(index)}
                  >
                    Case {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="font-semibold my-4">
            <p className="text-sm font-medium mt-4 text-white">Input:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {problem.examples[activeTestCaseId].inputText}
            </div>
            <p className="text-sm font-medium mt-4 text-white">Output:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {problem.examples[activeTestCaseId].outputText}
            </div>
          </div>
        </div>
        <EditorFooter handleSubmit={handleSubmit} />
      </Split>
    </div>
  );
};

export default Playground;
