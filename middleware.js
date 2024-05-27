import { auth } from "./app/_lib/auth";

// export const middlware = (request) => {
//   return NextResponse.redirect(new URL("/about", request.url));
// };

export const middleware = auth;

export const config = {
  mathcer: ["/account"],
};
