import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { firestore } from "./config";

export const addTaskToDB = async (userID, taskData) => {
  try {
    const tasksCollection = collection(firestore, `users/${userID}/tasks`);
    const taskDoc = await addDoc(tasksCollection, {
      ...taskData,
      timestamp: serverTimestamp(),
    });
    return {
      id: taskDoc?.id,
      ...taskData,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const getTasksFromDB = async (userID) => {
  try {
    const tasksCollection = collection(firestore, `users/${userID}/tasks`);
    const tasksQuery = query(tasksCollection, orderBy("timestamp"));
    const tasks = await getDocs(tasksQuery);
    return tasks.docs.map((task) => ({
      id: task.id,
      ...task.data(),
    }));
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const updateTask = async (userID, taskID, taskData) => {
  try {
    const tasksDoc = doc(firestore, `users/${userID}/tasks/${taskID}`);
    await setDoc(
      tasksDoc,
      {
        ...taskData,
        lastUpdated: serverTimestamp(),
      },
      {
        merge: true,
      }
    );
    return updateTask;
  } catch (error) {
    console.log(error);
  }
};


export const removeTaskFromDB = async (userID, taskID) => {
  try {
    const taskDoc = doc(firestore, `users/${userID}/tasks/${taskID}`);
    await deleteDoc(taskDoc);
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const getSingleTask = async (userID, taskID) => {
  try {
    const taskDocRef = doc(firestore, `users/${userID}/tasks/${taskID}`);
    const task = await getDoc(taskDocRef);
    return task.exists() ? { ...task.data(), id: taskID } : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const addSubTaskToDB = async (userID, taskID, subTaskData) => {
  try {
    const subTaskRef = collection(
      firestore,
      `users/${userID}/tasks/${taskID}/sub-tasks`
    );
    const subTask = await addDoc(subTaskRef, { ...subTaskData });

    return {
      id: subTask.id,
      ...subTaskData,
      timestamp: serverTimestamp(),
    };
  } catch (error) {
    console.log(error);
  }
};


export const getSubTaskFromDB = async (userID, taskID) => {
  try {
    const subTaskRef = collection(
      firestore,
      `users/${userID}/tasks/${taskID}/sub-tasks`
    );
    
    const subTasks = await getDocs(subTaskRef);
    

    return subTasks.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    
  } catch (error) {
    console.log(error);
  }
};
