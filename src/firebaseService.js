import { auth, favoritesCollection} from '@/firebaseInit';

const signup = async ({email, password}) => {
  try {
    const user = await auth.createUserWithEmailAndPassword(email, password);
  } catch (e) {
    console.log(e);
  }
}

const signin = async ({email, password}) => {
  try {
    const user = await auth.signInWithEmailAndPassword(email, password);
  } catch (e) {
    throw e
  }
}

const signout = async () => {
  await auth.signOut();
}

const likeAsteroid = async (asteroid) => {
  const payload = {
    userId: auth.currentUser.uid,
    asteroid
  }
  await favoritesCollection.add(payload);
}

const unlikeAsteroid = async (asteroidId) => {
  const asteroids = await favoritesCollection.where('asteroid.id', '==', asteroidId).get();
  await asteroids.forEach(a => a.ref.delete());
}

export default {
  signup,
  signin,
  signout,
  likeAsteroid,
  unlikeAsteroid
}