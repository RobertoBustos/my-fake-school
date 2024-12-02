import app from "@config/firebase";
import { StorageReference, deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage(app)
storage.maxOperationRetryTime = 500;

const createFileRef = (filePath: string) => {
    return ref(storage, filePath)
}

const uploadFile = (file: Blob | Uint8Array | ArrayBuffer, fileRef: StorageReference) => {
    return uploadBytes(fileRef, file)
}

const getFileDownloadURL = (fileRef: StorageReference) => {
    return getDownloadURL(fileRef)
}

const deleteFile = deleteObject

export { createFileRef, deleteFile, getFileDownloadURL, storage, uploadFile };
