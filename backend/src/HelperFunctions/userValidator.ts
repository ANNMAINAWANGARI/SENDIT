import Joi from 'joi'

export const UserSchema= Joi.object({
    email:Joi.string().required().email({ minDomainSegments: 1, tlds: { allow: ['com'] } }),
    password:Joi.string().required().min(8),
    firstName:Joi.string().required(),
    lastName:Joi.string().required()
})

export const UserSchema2= Joi.object({
    email:Joi.string().required().email({ minDomainSegments: 1, tlds: { allow: ['com'] } }),
    password:Joi.string().required().min(8),
  
})