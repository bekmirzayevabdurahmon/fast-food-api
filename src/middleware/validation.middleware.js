export const ValidationMiddleware = () => {
    return(req, res, next) => {
        const { error, value } = schema.validate(req.body);

        if(error){
            return res.status(404).send({
                message: error.message
            })
        }

        req.body = value;

        next()
    };
};