import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../constants";
import axios from "axios";
import { BaseProjectProperties, Project } from "./types";

const createProject = (data: BaseProjectProperties) =>
  axios
    .post<Project>(`${BASE_URL}/projects`, data)
    .then((response) => response.data);

const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: (newProject: Project) => {
      queryClient.setQueryData("projects", (oldData: Project[] = []) => [...oldData, newProject]);
      queryClient.invalidateQueries("projects");
    },
  });
};
  

export { useCreateProjectMutation };
