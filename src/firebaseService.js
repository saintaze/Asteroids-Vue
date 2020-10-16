import {auth, favoritesCollection} from '@/firebaseInit';

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
  await auth.signOut();
}

export const getUserId = () => {
  return auth.currentUser.uid;
}

export const isLoggedIn = () => {
  console.log('loggedin', !!auth.currentUser)
  return !!auth.currentUser;
}

export const likeAsteroid = async () => {

}

export const unlikeAsteroid = async () => {

}

export const getfavoritedAsteroids = async () => {
  const userId = getUserId();
  const favoriteAsteroids = [];
  const favoritesSnapshot = await favoritesCollection.where('userId', '==', userId).get();
  favoritesSnapshot.forEach(a => {
    favoriteAsteroids.push(a.data().asteroid);
  });
  return favoriteAsteroids;
}