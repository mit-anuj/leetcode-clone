import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import { problems } from "@/utils/problems";
import React from "react";

const ProblemPage = ({problem}) => {
  return (
    <div>
      <Topbar problemPage={true} />
      <Workspace problem={problem}/>
    </div>
  );
};

export default ProblemPage;

// fetch the problems data
// this will create the dynamic routes
export async function getStaticPaths() {
	const paths = Object.keys(problems).map((key) => ({
		params: { pid: key },
	}));
    // console.log("paths",paths)
	return {
		paths,
		fallback: false,
	};
}

// getStaticProps will fetch teh problem data.
export async function getStaticProps( {params} ) {
	const { pid } = params;
	const problem = problems[pid];
	if (!problem) {
		return {
			notFound: true,
		};
	}
    if (problem.handlerFunction) {
        // this function is used to convert the json into string
        problem.handlerFunction = problem.handlerFunction.toString();
    } else {
        console.warn(`Handler function missing for problem with id: ${pid}`);
    }

	return {
		props: {
			problem
		},
	};
}
