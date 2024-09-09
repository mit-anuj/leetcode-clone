import ProblemTable from "@/components/ProbelmTable/ProblemTable";
import Topbar from "@/components/Topbar/Topbar";

export default function Home() {
  return (
    <main className="bg-dark-layer-2 min-h-screen">
      <Topbar problemPage={false}/>
      <h1 className="text-2xl text-center text-gray-700 dark:text-gray-400 font-medium uppercase mt-10 mb-5">
        &ldquo; QUALITY OVER QUANTITY &ldquo; 
      </h1>
      <div className="relative overflow-x-auto mx-auto px-6 pb-10">
        <table className="text-sm text-left text-gray-500 dark:text-gray-400 ms:w-7/12 w-full max-w-[1200px] mx-auto">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
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
        </thead>
        <ProblemTable/>
        </table>
      </div>
    </main>
  );
}
