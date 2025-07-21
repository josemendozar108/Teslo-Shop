'use client';

import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(authenticate, undefined);
  console.log({state}); 

  useEffect(() => {
    if ( state === 'Success' ) {
      // redireccionar
      // router.replace('/');
      window.location.replace('/');
    }

  },[state]);


  return (
    <form action={formAction} className="flex flex-col">

      <label htmlFor="email">Correo electrónico</label>
      <input
        name="email"
        type="email"
        required
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
      />

      <label htmlFor="password">Contraseña</label>
      <input
        name="password"
        type="password"
        required
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
      />

         <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === "CredentialsSignin" && (
          <div className="flex flex-row mb-2">
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">
              Credenciales no son correctas
            </p>
          </div>
        )}
      </div>
      
     <button
        type="submit"
         className={ clsx({
        "btn-primary": !isPending,
        "btn-disabled": isPending
      })}
      disabled={ isPending }
      >
        Ingresar 
      </button>

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/new-account"
        className="btn-secondary text-center"
      >
        Crear una nueva cuenta
      </Link>

    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();


  return (
    <button 
      type="submit" 
      className={ clsx({
        "btn-primary": !pending,
        "btn-disabled": pending
      })}
      disabled={ pending }
      >
      Ingresar
    </button>
  );
}
