'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth'; // o '@auth/core/errors' si usas @auth/core directamente

/**
 * Server Action: Autenticación desde formulario con FormData (useFormState)
 */
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
): Promise<string> {
  try {
    const data = Object.fromEntries(formData);

    await signIn('credentials', {
      ...data,
      redirect: false,
    });

    return 'Success';

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales inválidas';
        case 'OAuthAccountNotLinked':
          return 'Cuenta no vinculada. Usa el mismo proveedor para iniciar sesión.';
        case 'CallbackRouteError':
          return 'Error en la redirección de autenticación';
        default:
          return `Error de autenticación: ${error.type}`;
      }
    }

    return 'Error desconocido';
  }
}

/**
 * Función directa para login personalizado con email y password
 */
export async function login(email: string, password: string): Promise<{ ok: boolean; message?: string }> {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return { ok: true };

  } catch (error) {
    if (error instanceof AuthError) {
      let message: string;

      switch (error.type) {
        case 'CredentialsSignin':
          message = 'Correo o contraseña incorrectos';
          break;
        case 'OAuthAccountNotLinked':
          message = 'Tu cuenta no está vinculada a este método';
          break;
        default:
          message = `Error de autenticación: ${error.type}`;
      }

      return { ok: false, message };
    }

    return { ok: false, message: 'Error inesperado en el servidor' };
  }
}
