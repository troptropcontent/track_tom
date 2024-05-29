import { useMutation, useQuery } from "react-query";
import { BASE_URL } from "../constants";
import axios from "axios";
import { BaseProjectProperties, Project } from "./types";

const createProject = (data: BaseProjectProperties) =>
  axios
    .post<Project[]>(`${BASE_URL}/projects`, data)
    .then((response) => response.data);

const useCreateProjectMutation = () =>
  useMutation({ mutationFn: createProject });

export { useCreateProjectMutation };
