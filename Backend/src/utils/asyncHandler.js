export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        console.error('AsyncHandler caught error:', err); // Add this log
        
        // Return JSON response
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'Internal server error',
            errors: err.errors || [],
        });
    });
};  