type Project = BaseProjectProperties & GeneratedProperties;

type BaseProjectProperties = {
  name: string;
  description: string;
};

type GeneratedProperties = {
  id: string;
  createdAt: string;
  updatedAt: string;
};
export type { Project, BaseProjectProperties };