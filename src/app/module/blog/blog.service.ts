
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
    const result = await Blog.create(payload);
    const blogResult = await Blog.findById(result?._id)
        .populate('author')
        .select('_id title content author');
    return blogResult;
};

const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
    const isBlogExist = await Blog.findById(id);
    if (!isBlogExist) {
        throw new AppError(405, 'Blog not found!!!');
    }
    const result = await Blog.findByIdAndUpdate(id, payload, {
        new: true,
    })
        .populate('author')
        .select('_id title content author');
    return result;
};
const deleteBlogFromDB = async (id: string) => {
    await Blog.findByIdAndDelete(id);
    return await Blog.findById(id);
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {

    const blogQuery = new QueryBuilder(
        Blog.find().populate('author').select('_id title content author'),
        query,
    )
        .search(['title', 'content'])
        .sort()
        .filter();
    const result = await blogQuery.modelQuery;
    return result;
};
const getSingleBlogsFromDB = async (id: string) => {
    const result = await Blog.findById(id)
        .populate('author')
        .select('_id title content author');
    return result;
};

export const BlogServices = {
    createBlogIntoDB,
    updateBlogIntoDB,
    getAllBlogsFromDB,
    getSingleBlogsFromDB,
    deleteBlogFromDB,
};
