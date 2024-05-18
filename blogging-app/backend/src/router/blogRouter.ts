import { Hono } from "hono";
import { getBlogs, getBlog, createBlog, updateBlog } from "../controllers/blogController";
import { authmiddleware } from "../middleware/auth";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.get('/allBlogs', getBlogs);
// blogRouter.get('/userBlogs', getUserPosts);
blogRouter.post('/createBlog', authmiddleware, createBlog);
blogRouter.get('/blog/:id', authmiddleware, getBlog);
blogRouter.put('/blog/:id', authmiddleware, updateBlog);
// blogRouter.delete('/blog/:id', deletePost);