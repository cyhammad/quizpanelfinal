import React, { useState } from "react";
import phone3d from "../assets/images/phone3d.png";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import BackdropModal from "../components/UI/BackdropModal";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useStateContext } from "../contexts/ContextProvider";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";


export default function AddUser() {
  const { updateCheck } = useStateContext();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, "abcd1234").then( async () => {
          await addDoc(collection(db, "users"), {
            name: author,
            email: email,
            date: Timestamp.fromDate(new Date(Date.now())),
          });
          updateCheck();
          setShowModal(true);
      }).catch(() => {
        setErrorModal(true);
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen sm:max-w-screen-2xl px-6 sm:px-8 xl:px-6 xl:py-8 sm:mx-auto">
      <section>
        
        <div className="my-8 sm:flex items-center justify-between w-full">
          <div className="flex items-center">
            <svg
              className="w-8 h-8 text-secondary-300"
              viewBox="0 0 34 34"
              fill="currentColor"
              onClick={()=>{
                navigate('/users')
              }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.4418 7.08325C15.722 7.08443 15.9955 7.16866 16.2278 7.32529C16.4601 7.48192 16.6408 7.70392 16.7469 7.96321C16.8531 8.22251 16.88 8.50746 16.8242 8.78203C16.7684 9.0566 16.6324 9.30845 16.4335 9.50575L9.91683 15.9941C9.78405 16.1258 9.67866 16.2825 9.60674 16.4551C9.53481 16.6277 9.49778 16.8129 9.49778 16.9999C9.49778 17.1869 9.53481 17.3721 9.60674 17.5447C9.67866 17.7174 9.78405 17.8741 9.91683 18.0058L16.4335 24.4941C16.5663 24.6258 16.6717 24.7825 16.7436 24.9551C16.8155 25.1278 16.8525 25.3129 16.8525 25.4999C16.8525 25.687 16.8155 25.8721 16.7436 26.0448C16.6717 26.2174 16.5663 26.3741 16.4335 26.5058C16.1681 26.7696 15.809 26.9177 15.4347 26.9177C15.0605 26.9177 14.7014 26.7696 14.436 26.5058L7.9335 20.0033C7.13762 19.2064 6.69058 18.1262 6.69058 16.9999C6.69058 15.8737 7.13762 14.7935 7.93351 13.9966L14.436 7.49409C14.5684 7.36279 14.7253 7.25891 14.898 7.18841C15.0706 7.11791 15.2554 7.08218 15.4418 7.08325Z" />
              <path d="M25.3583 7.08325C25.6385 7.08443 25.912 7.16866 26.1443 7.32529C26.3767 7.48192 26.5573 7.70392 26.6634 7.96321C26.7696 8.22251 26.7965 8.50746 26.7407 8.78203C26.6849 9.0566 26.5489 9.30845 26.35 9.50575L18.8558 16.9999L26.35 24.4941C26.4828 24.6258 26.5882 24.7825 26.6601 24.9551C26.732 25.1278 26.769 25.3129 26.769 25.4999C26.769 25.687 26.732 25.8721 26.6601 26.0448C26.5882 26.2174 26.4828 26.3741 26.35 26.5058C26.0846 26.7696 25.7255 26.9177 25.3512 26.9177C24.977 26.9177 24.6179 26.7696 24.3525 26.5058L15.8525 18.0058C15.7197 17.8741 15.6143 17.7174 15.5424 17.5447C15.4705 17.3721 15.4334 17.1869 15.4334 16.9999C15.4334 16.8129 15.4705 16.6277 15.5424 16.4551C15.6143 16.2825 15.7197 16.1258 15.8525 15.9941L24.3525 7.49409C24.4849 7.36279 24.6418 7.25891 24.8145 7.18841C24.9871 7.11791 25.1719 7.08218 25.3583 7.08325Z" />
            </svg>

            <h2 className="text-xxl sm:text-2xl text-primary-500 font-medium">
              Add User
            </h2>
          </div>
        </div>
      </section>
      <form onSubmit={submitHandler} className="flex justify-between gap-20">
        <div className="flex-auto">
          <div className="grid grid-cols-12 gap-y-8">
            <div className="col-span-12 sm:col-span-5 sm:pb-8 sm:border-b sm:border-b-primary-100">
              <label className="">Author</label>
              <p className="mt-2 text-xs text-white text-opacity-50">
                Enter the author
              </p>
            </div>
            <div className="col-span-12 sm:col-span-7 pb-6 sm:pb-8 border-b border-b-primary-100">
              <Input
                placeholder={"Type something ..."}
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
              />
            </div>
            <div className="col-span-12 sm:col-span-5 sm:pb-8 sm:border-b sm:border-b-primary-100">
              <label className="">Email</label>
              <p className="mt-2 text-xs text-white text-opacity-50">
                Enter the email
              </p>
            </div>
            <div className="col-span-12 sm:col-span-7 pb-6 sm:pb-8 border-b border-b-primary-100">
              <Input
                placeholder={"Type something ..."}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            {/* <div className="col-span-12 sm:col-span-5 sm:pb-8 sm:border-b sm:border-b-primary-100">
              <label className="">Password</label>
              <p className="mt-2 text-xs text-white text-opacity-50">
                Enter the Password
              </p>
            </div>
            <div className="col-span-12 sm:col-span-7 pb-6 sm:pb-8 border-b border-b-primary-100">
              <Input
                placeholder={"Type something ..."}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div> */}
          </div>
          <div className="mt-16 flex gap-8">
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="w-full px-8 py-3 rounded bg-primary-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full px-8 py-3 rounded bg-secondary-300"
            >
              Save
            </button>
          </div>
        </div>
        <div className="hidden">
          <h3 className="font-bold">Preview of the quiz</h3>
          <p className="text-xs text-white text-opacity-50">Live Preview</p>
          <div className="mt-6 p-11 bg-primary-100">
            <img src={phone3d} alt="" />
            <div className="pt-14 flex justify-center gap-4">
              <button className="px-14 py-1 bg-secondary-300 rounded-md">
                3d
              </button>
              <button className="px-14 py-1 bg-primary-200 rounded-md">
                2d
              </button>
            </div>
          </div>
        </div>
      </form>
      <BackdropModal
        title="Successfully Saved"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        <p className="mb-6 text-center text-white text-opacity-50">
          Excel data contains standard daa input templates for KPIs. Please open
          the data sheet and input weekly actuals and targets.
        </p>
        <div className="flex justify-center">
          <div className="w-2/3">
            <Button
              secondaryAlt
              fullWidth
              type={"button"}
              onClick={() => {
                setShowModal(false);
                navigate("/users");
              }}
            >
              Yes
            </Button>
          </div>
        </div>
      </BackdropModal>
      <BackdropModal
        title="Error"
        show={errorModal} 
        onClick={() => setErrorModal(false)}
      >
        <p className="mb-6 text-center text-white text-opacity-50">
          User already exists.
        </p>
        <div className="flex justify-center">
          <div className="w-2/3">
            <Button
              secondaryAlt
              fullWidth
              type={"button"}
              onClick={() => {
                setErrorModal(false);
              }}
            >
              Yes
            </Button>
          </div>
        </div>
      </BackdropModal>
    </div>
  );
}
