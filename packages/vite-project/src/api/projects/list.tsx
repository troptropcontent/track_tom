import { useQuery } from "react-query";
import { BASE_URL } from "../constants";
import axios from "axios";
import { Project } from "./types";

const fetchProjects = () =>
  axios
    .get<Project[]>(`${BASE_URL}/projects`)
    .then((response) => response.data);

const useProjectsQuery = () =>
  useQuery({ queryKey: "projects", queryFn: fetchProjects });

export { useProjectsQuery };
