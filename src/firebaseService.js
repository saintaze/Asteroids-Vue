import {auth, db, likesCollection} from '@/firebaseInit';

export const signup = async ({email, password}) => {
  try {
    const user = await auth.createUserWithEmailAndPassword(email, password);
    console.log(user)
  } catch (e) {
    console.log(e);
  }
}

export const signin = async ({email, password}) => {
  try {
    const user = await auth.signInWithEmailAndPassword(email, password);
    console.log(user)
  } catch (e) {
    console.log(e);
  }
}

export const signout = async () => {

}

export const getUserId = () => {
  return auth.currentUser.uid;
}

export const isLoggedIn = () => {
  return !!auth.currentUser;
}

export const likeAsteroid = async () => {

}

export const unlikeAsteroid = async () => {

}

export const getLikedAsteroids = async () => {
  const userId = getUserId();
  const likedAsteroids = [];
  const asteroidsSnapshot = await likesCollection.where('userId', '==', userId).get();
  asteroidsSnapshot.forEach(a => {
    likedAsteroids.push(a.data().asteroid);
  });
  return likedAsteroids;
}