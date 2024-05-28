import { useQuery } from "react-query";
import { BASE_URL } from "../constants";
import axios from "axios";

type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

const fetchProjects = () =>
  axios
    .get<Project[]>(`${BASE_URL}/projects`)
    .then((response) => response.data);

const useProjectsQuery = () =>
  useQuery({ queryKey: "projects", queryFn: fetchProjects });

export { useProjectsQuery };
