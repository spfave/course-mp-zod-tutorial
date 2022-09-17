import { type } from "os";
import { z } from "zod";
import { Equal, Expect } from "./helpers/type-utils";

/**
 * 🕵️‍♂️ Refactor this code below to reduce the duplication,
 * while also making sure the cases don't go red!
 */

// const User = z.object({
//   id: z.string().uuid(),
//   name: z.string(),
// });

// const Post = z.object({
//   id: z.string().uuid(),
//   title: z.string(),
//   body: z.string(),
// });

// const Comment = z.object({
//   id: z.string().uuid(),
//   text: z.string(),
// });

const ObjectWithId = z.object({
  id: z.string().uuid(),
});

const User = ObjectWithId.extend({
  name: z.string(),
});
type UserType = z.infer<typeof User>;

const PostBase = z.object({
  title: z.string(),
  body: z.string(),
});
const Post = ObjectWithId.merge(PostBase);
type PostType = z.infer<typeof Post>;

const Comment = ObjectWithId.extend({
  text: z.string(),
});
type CommentType = z.infer<typeof Comment>;

type cases = [
  Expect<Equal<z.infer<typeof Comment>, { id: string; text: string }>>,
  Expect<
    Equal<z.infer<typeof Post>, { id: string; title: string; body: string }>
  >,
  Expect<Equal<z.infer<typeof User>, { id: string; name: string }>>,
];
