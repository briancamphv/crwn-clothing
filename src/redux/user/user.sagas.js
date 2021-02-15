import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { auth, googleProvider, createUserProfileDocument, getCurrenUser } from '../../firebase/firebase.utils';
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpFailure } from './user.actions';

export function* getSnapShotFromUserAuth(user, additionalData) {

    try {

        const userRef = yield call(createUserProfileDocument, user, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(
            signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
        )

    } catch (error) {

        yield put(signInFailure(error));
    }

}




export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapShotFromUserAuth(user)

    } catch (error) {

        yield put(signInFailure(error));
    }

}



export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapShotFromUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error))
    }

}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrenUser()
        if (!userAuth) return;
        yield getSnapShotFromUserAuth(userAuth);

    } catch (error) {
        yield put(signInFailure);
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess())

    } catch (error) {

        yield put(signOutFailure(error))
    }
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {

        const { user } = yield auth.createUserWithEmailAndPassword(
            email,
            password
        );

        const additionalData = {
            "displayName": displayName
        }

        yield getSnapShotFromUserAuth(user, additionalData)

    } catch (error) {
        yield put(signUpFailure(error))
    }

}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart)
    ])
}