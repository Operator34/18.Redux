import httpService from "./http.service";

const todosEndpoint = "todos/";
const todosService = {
    fetch: async () => {
        const { data } = await httpService.get(todosEndpoint, {
            params: { _page: 1, _limit: 10 },
        });
        return data;
    },
    fetchPost: async () => {
        const { data } = await httpService.post(todosEndpoint, {
            title: "Это новая таска",
            completed: true,
        });
        return data;
    },
};
export default todosService;
