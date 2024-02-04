import { HttpResponse, http } from "msw";
import { config } from "../../config";
import { users } from "./data/users";

export const handlers = [
  http.get(config.SERVER_URL + "api/Users", ({ request }) => {
    const searchParams = new URL(request.url).searchParams;

    const errorCode = <number | null>searchParams.get("errorCode");

    if (errorCode) return HttpResponse.error();

    let pageNum = <number | null>searchParams.get("pageNum");

    if (!pageNum) pageNum = 1;

    let pageSize = <number | null>searchParams.get("pageSize");

    if (!pageSize) pageSize = 3;

    let usersArray = users;

    usersArray.splice(0, (pageNum - 1) * pageSize);

    return HttpResponse.json(usersArray.slice(0, pageSize));
  }),
];
