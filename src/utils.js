import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(
    import.meta.url);
export const __dirname = path.dirname(__filename);


export const baseUrl = 'http://localhost:8080';

export const buildResponsePaginated = (data) => {
    return {
        status: 'success',
        payload: data.docs.map((doc) => doc.toJSON()),
        totalPages: data.totalPages,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        page: data.page,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevLink: data.hasPrevPage ? `${baseUrl}/products?limit=${data.limit}&page=${data.prevPage}` : null,
        nextLink: data.hasNextPage ? `${baseUrl}/products?limit=${data.limit}&page=${data.nextPage}` : null,
    };
};