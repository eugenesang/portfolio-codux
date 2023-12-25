import { useContext } from 'react';
import { APIContext } from './data-api';
import useSWR, { useSWRConfig } from 'swr';
import { StrapiProject } from './types';

type ProjectsMap = { [k: string]: StrapiProject };
const PROJECTS_MAP_KEY = 'project/map';

export function useProjects() {
  const api = useContext(APIContext);
  const { mutate } = useSWRConfig();

  return useSWR('project/list', api.getProjects, {
    //here we add a map of items to the cache so we can read a single item from it later
    onSuccess: (projects) => {
      const projectsMap: ProjectsMap = Object.fromEntries(projects.data.map((it) => [it.id, it]));
      mutate(PROJECTS_MAP_KEY, projectsMap).catch((e) => {
        console.error('mutate failed', e);
      });
    },
  });
}

export function useProject(id: number) {
  const api = useContext(APIContext);
  const { cache } = useSWRConfig();
  const projectsMap = cache.get(PROJECTS_MAP_KEY);
  const projectFromCache = (projectsMap?.data as ProjectsMap | undefined)?.[id];

  //we fetch the item from the server only if we don't have it in the cached map
  const fetched = useSWR(!projectFromCache ? `project/${id}` : null, () => api.getProject(id));

  return projectFromCache
    ? { data: projectFromCache, isLoading: false }
    : { isLoading: fetched.isLoading, data: fetched.data?.data };
}

export function useAbout() {
  const api = useContext(APIContext);
  return useSWR('about', api.getAbout);
}

export function useProjectItems(projectId: number) {
  const api = useContext(APIContext);
  return useSWR(`project-items/${projectId}`, () => api.getProjectItemsByProject(projectId));
}
