import { defineStore } from 'pinia';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/js/firebase';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStoreNotes } from './storeNotes';

export const useStoreAuth = defineStore('storeAuth', () => {
  const router = useRouter();
  const userState = reactive({});

  const init = () => {
    const storeNotes = useStoreNotes();

    onAuthStateChanged(auth, user => {
      if (user) {
        // console.log('user logged in', user);

        userState.email = user.email;
        userState.id = user.uid;
        router.push('/');
        storeNotes.init();
      } else {
        console.log('user logged out');
        userState.email = undefined;
        userState.id = undefined;

        storeNotes.clearNotes();
        router.replace('/auth');
      }
    });
  };

  const registerUser = credentials => {
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      .then(userCredential => {
        // Signed up
        const user = userCredential.user;
        // console.log('user: ', user);
      })
      .catch(error => {
        console.log('error.message: ', error.message);
      });
  };

  const loginUser = credentials => {
    // const auth = getAuth();
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then(userCredential => {
        const user = userCredential.user;
        // console.log('user: ', user);
      })
      .catch(error => {
        console.log('error.message: ', error.message);
      });
  };

  const logoutUser = () => {
    // const auth = getAuth();
    signOut(auth)
      .then(() => {
        // console.log('User signed out');
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  return {
    userState,
    init,
    registerUser,
    logoutUser,
    loginUser,
  };
});
