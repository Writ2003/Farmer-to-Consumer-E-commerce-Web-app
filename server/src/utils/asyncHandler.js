const asyncHandler =  (asyncFunction) => async (req, res, next) => {
    try {
        return await asyncFunction(req,res,next);
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success : false,
            message : error.message
        })
    }
}
export { asyncHandler };