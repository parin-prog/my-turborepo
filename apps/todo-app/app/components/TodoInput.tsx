import { getInputProps } from "@conform-to/react";
import ErrorMsg from "./ErrorMsg";

const TodoInput = ({ fields, errMsg }: any) => {

  return (
    <div className="flex items-center gap-10 w-[50vw]">
      <input
        // type="text"
        // name="text"
        {...getInputProps(fields.text, {type: "text"})}
        className="p-4 h-12 w-full border-2 border-slate-500 bg-slate-900 text-white"
      />
      {/* <ErrorMsg msg={errMsg} /> */}
      <input
        type="submit"
        value={"Add"}
        className="p-3.5 px-5 rounded-sm text-center bg-purple-700 text-white cursor-pointer"
      />
    </div>
  );
};

export default TodoInput;
