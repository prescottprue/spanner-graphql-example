import * as admin from 'firebase-admin';

/**
 * Get Real Time Database Reference at provided path.
 * @param {String} refPath - Path of real time database reference
 * @return {firebase.database.Reference} Reference at provided path
 * @memberof utils
 */
export function rtdbRef(refPath: string) {
  try {
    if (typeof refPath !== 'string') {
      throw new Error(`A string path is required to build ref object for path: ${refPath}`);
    }
    return admin.database().ref(refPath);
  } catch (e) {
    console.error('Problem reading from ref', refPath);
    throw e;
  }
}

/**
 * Get data at RTDB path.
 * @param {String|firebase.database.Reference} ref - Path of real time database reference
 * or reference itself.
 * @return {Promise} - Resolves with database shapshot of data at provided path
 * @memberof utils
 */
export function rtdbSnap(ref: string | admin.database.Reference): Promise<admin.database.DataSnapshot> {
  if (typeof ref === 'string') {
    // this is actually a path
    return rtdbSnap(rtdbRef(ref));
  }
  return ref.once('value');
}

/**
 * Get value from RTDB reference path
 * @param {String|firebase.database.Reference} ref - Path of real time database reference
 * or reference itself.
 * @return {Promise} - Resolves with value at database location
 * @memberof utils
 */
export function rtdbVal(ref: string | admin.database.Reference): Promise<any> {
  return rtdbSnap(ref).then(refSnap => refSnap.val());
}