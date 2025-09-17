const validator = require("../helpers/validate");

const saveContact = (req, res, next) =>{
    const validationRule = {
        firstName: "required|string",
        lastName: "required|string",
        email: "required|email",
        favouriteColor: "required|string",
        birthday: "string"
    };
    validator(req.body, validationRule, {}, (err, status)=>{
        if(!status){
            res.status(412).send({
                success: false,
                message: "Validation Failed",
                data: err
            });
        }else{
            next();
        }
    });
};

module.exports = {
    saveContact
};