import axios from "axios";
import { BASE_URL } from "../constants";
import { useMutation, useQueryClient } from "react-query";

const removeProject = (id: number) =>
  axios
    .delete(`${BASE_URL}/projects/${id}`)
    .then((response) => response.data);

const useRemoveProjectMutation = () =>
  {
    const queryClient = useQueryClient();
    return useMutation({ mutationFn: removeProject, onSuccess: () => {
      queryClient.invalidateQueries('projects');
    } });
  }
export { useRemoveProjectMutation };