const adminAuth = async (req, res, next) => {
    try {

        const { email, password } = req.headers;

        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {
            next();
        } else {
            res.json({
                success: false,
                message: "Not Authorized"
            });
        }

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

export default adminAuth;