import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { useState } from "react";
const Playground = ({problem}) => {
  const boilerPlate = `function twoSum(nums,target) { 
    //write code here 
  };`;
  const [activeTestCaseId,setActiveTestCaseId] = useState(0);
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
            value={problem.starterCode}
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
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
            {problem.examples.map((testCases,index)=>(
              <div className="mr-2 items-start mt-2 text-white" key={testCases.id}>
              <div className="flex flex-wrap items-center gap-y-4">
                <div
                  className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3
                    hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap ${activeTestCaseId === index?'text-white': 'text-gray-500'}`}
                onClick={()=>setActiveTestCaseId(index)}>
                  Case {index+1}
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
        <EditorFooter />
      </Split>
    </div>
  );
};

export default Playground;
