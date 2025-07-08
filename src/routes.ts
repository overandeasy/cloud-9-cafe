import {
    type RouteConfig,
    index,
    route,
} from "@react-router/dev/routes";

export default [
    index("./pages/Home.tsx"),
    route("/about", "./pages/About.tsx"),
    route("/my-coffees", "./pages/private/MyCoffees.tsx"),
    // * matches all URLs, the ? makes it optional so it will match / as well
    route("*?", "catchall.tsx"),
] satisfies RouteConfig;
