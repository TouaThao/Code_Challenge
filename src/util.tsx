import { NameList } from "./NameInterFace";

const LOCAL_STORAGE_NAME = "localStorageData";

export const retrieveData = () => {
  const localData = localStorage.getItem(LOCAL_STORAGE_NAME) || "[]";
  const localStorageData = JSON.parse(localData);
  return localStorageData as NameList;
};

export const saveToLocal = (data: NameList) => {
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(data));
};
