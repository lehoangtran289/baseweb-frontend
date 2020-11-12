import { useEffect, useState } from "react";
import { firebaseStorage } from "../firebase/config";
import { firebase_storage_ava_ref } from "../config/config";

/**
 * This hook takes in a file and put to firebase storage
 * @param file
 * @returns {{progress, error, url}}
 */
const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // firebase storage references
    const storageRef = firebaseStorage.ref(
      firebase_storage_ava_ref + file.name
    );

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => {
        setError(error);
      },
      async () => {
        const fileUrl = await storageRef.getDownloadURL();
        setUrl(fileUrl);
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
