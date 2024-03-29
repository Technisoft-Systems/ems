import { signIn, useSession } from "next-auth/react";
import React from "react";



const AuthRedirect = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex h-full w-full overflow-hidden flex-col justify-center items-center text-center">
        <p className="p-4">
          You are not authorised to view this page. Please Sign in first
        </p>

        <button
          onClick={()=>{signIn().catch((e)=>{
            console.error(e);
          })}}
          className="btn-1 text-slate-600 hover:text-slate-700 hover:bg-slate-300"
        >
          Sign In
        </button>
      </div>
    );
  }else{
    return (
      <div className="flex h-full w-full flex-col justify-center items-center text-center">
        <p className="p-4">
          You are not authorised to view this page.
        </p>
      </div>
    );
  }
};

export default AuthRedirect;
