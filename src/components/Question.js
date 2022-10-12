import { GlobalContext } from "../contexts/FieldContext";
import { useContext } from "react";
import Input from "./UI/Input";
import Select from "./UI/Select";

const Question = (props) => {
  const { updateField } = useContext(GlobalContext);

  const updateQuesField = (e) => {
    updateField({ id: props.fieldId, ques: e.target.value, ans: e.target.parentNode.parentNode.parentNode.children[3].children[0].children[0].value });
  };
  const updateAnsField = (e) => {
    updateField({ id: props.fieldId, ques: e.target.parentNode.parentNode.parentNode.children[1].children[0].children[0].value, ans: e.target.value });
  };

  return (
    <div className="col-span-12 grid grid-cols-12 gap-y-3 sm:gap-y-8">
      <div className="col-span-12 sm:col-span-5">
      <label className="">Question {props.fieldId+1}</label>
        <p className="mt-2 text-xs text-white text-opacity-50">
            Enter a question
        </p>
      </div>
      <div className="col-span-12 sm:col-span-7">
        <Input
            required
            placeholder={"Type something ..."}
            onChange={updateQuesField}
            className="questionField"
        />
      </div>
      <div className="col-span-12 sm:col-span-5 sm:pb-8 sm:border-b sm:border-b-primary-100">
        <label className=""></label>
      </div>
      <div className="col-span-12 sm:col-span-7 pb-6 sm:pb-8 border-b border-b-primary-100">
        <Select
            alt
            required
            onChange={updateAnsField}
        >
            <option value="True">
            <span style={{ color: "red"}}>&#10004; </span>
            True
            </option>
            <option value="False">
            <span style={{ color: "green"}}>&#10005; </span>
            False
            </option>
        </Select>
      </div>
    </div>
  );
};

export default Question;

